'use client';

import { Button, Input, Label, Modal, ModalBody, Pagination } from '@westpac/ui';
import { SearchIcon } from '@westpac/ui/icon';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  createContext,
  type MutableRefObject,
  type ReactNode,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { useSidebar } from '../sidebar/sidebar.context';

export type SearchResult = {
  context?: string;
  href: string;
  label: string;
  pageHref: string;
  searchText: string;
  titleText: string;
  tab?: string;
};

const RESULTS_PER_PAGE = 10;

type SearchContextValue = {
  openSearch: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

function SearchNavigationFocus({ pendingFocusRef }: { pendingFocusRef: MutableRefObject<boolean> }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocation = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    const focusDestination = () => {
      if (!pendingFocusRef.current) {
        return;
      }

      requestAnimationFrame(() => {
        const headingId = decodeURIComponent(window.location.hash.slice(1));
        const destination = (headingId && document.getElementById(headingId)) || document.getElementById('content');
        pendingFocusRef.current = false;
        destination?.focus();
      });
    };

    focusDestination();
    window.addEventListener('hashchange', focusDestination);
    return () => window.removeEventListener('hashchange', focusDestination);
  }, [currentLocation, pendingFocusRef]);

  return null;
}

export function SearchProvider({ children, results }: { children: ReactNode; results: SearchResult[] }) {
  const state = useOverlayTriggerState({});
  const { setOpen } = useSidebar();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [portalContainer, setPortalContainer] = useState<Element>();
  const pendingFocusRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = query.trim().toLowerCase();
  let resultsContent: ReactNode;

  useEffect(() => {
    if (state.isOpen) {
      inputRef.current?.focus();
    }
  }, [state.isOpen]);

  const matchingResults = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    const matches = results.filter(
      result =>
        (!result.context && result.titleText.toLowerCase().includes(normalizedQuery)) ||
        result.searchText.toLowerCase().includes(normalizedQuery),
    );
    const seenTargets = new Set<string>();

    return matches
      .filter(result => {
        if (seenTargets.has(result.href)) {
          return false;
        }
        seenTargets.add(result.href);
        return true;
      })
      .sort((first, second) => {
        const getRank = (result: SearchResult) => {
          if (!result.context && result.titleText.toLowerCase().includes(normalizedQuery)) {
            return 0;
          }
          if (result.context && result.searchText.toLowerCase().includes(normalizedQuery)) {
            return 1;
          }
          return 2;
        };

        return getRank(first) - getRank(second);
      });
  }, [normalizedQuery, results]);
  const totalPages = Math.ceil(matchingResults.length / RESULTS_PER_PAGE);
  const pageResults = matchingResults.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);

  if (!normalizedQuery) {
    resultsContent = (
      <p className="py-3 typography-body-10 text-text-muted">Enter a search term to find pages and guidance.</p>
    );
  } else {
    resultsContent = (
      <>
        <p className="pb-2 typography-body-11 text-text-muted">
          {matchingResults.length} {matchingResults.length === 1 ? 'result' : 'results'}
        </p>
        {matchingResults.length ? (
          <>
            <ul aria-label="Search results" className="divide-y divide-border-muted-soft">
              {pageResults.map((result, index) => (
                <li key={`${result.href}-${result.context ?? 'page'}-${index}`}>
                  <Link
                    className="block rounded px-3 py-3 text-text-body hover:bg-surface-muted-faint focus-visible:focus-outline"
                    href={result.href}
                    onClick={() => {
                      pendingFocusRef.current = true;
                      setOpen(false);
                      state.close();
                    }}
                  >
                    <span className="block typography-body-10 font-bold">{result.label}</span>
                    {result.context && (
                      <span className="mt-1 block typography-body-11 text-text-muted">{result.context}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <Pagination className="mt-4" current={currentPage} onChange={setCurrentPage} totalPages={totalPages} />
            )}
          </>
        ) : (
          <p className="py-3 typography-body-10 text-text-muted">No results found.</p>
        )}
      </>
    );
  }

  return (
    <SearchContext.Provider
      value={{
        openSearch: () => {
          setQuery('');
          setCurrentPage(1);
          setPortalContainer(document.querySelector('[data-brand]') ?? document.body);
          state.open();
        },
      }}
    >
      <Suspense fallback={null}>
        <SearchNavigationFocus pendingFocusRef={pendingFocusRef} />
      </Suspense>
      {children}
      <Modal
        aria-label="Search GEL Design System"
        className="!top-2 max-h-[calc(100dvh-2rem)] overflow-hidden"
        isDismissable
        portalContainer={portalContainer}
        size="md"
        state={state}
        title="Search GEL Design System"
        zIndex={1100}
      >
        <ModalBody className="flex max-h-[calc(100dvh-12rem)] min-h-0 flex-col gap-4 overflow-y-auto bg-background-white p-7">
          <div className="flex flex-col">
            <Label htmlFor="design-system-search" size="small">
              Search pages and guidance
            </Label>
            <Input
              autoFocus
              className="w-full"
              id="design-system-search"
              onChange={event => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
              onKeyDown={event => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  resultsRef.current?.querySelector('a')?.focus();
                }
              }}
              placeholder="Enter a search term"
              ref={inputRef}
              type="search"
              value={query}
            />
          </div>
          <div aria-live="polite" className="min-h-12 overflow-y-auto" ref={resultsRef}>
            {resultsContent}
          </div>
        </ModalBody>
      </Modal>
    </SearchContext.Provider>
  );
}

export function SearchTrigger({ className }: { className?: string }) {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('SearchTrigger must be rendered inside SearchProvider');
  }

  return (
    <Button className={className} iconBefore={SearchIcon} look="faint" onClick={context.openSearch} soft>
      Search
    </Button>
  );
}

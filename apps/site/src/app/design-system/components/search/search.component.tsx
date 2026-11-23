'use client';

import { Button, Modal, ModalBody } from '@westpac/ui';
import { SearchIcon } from '@westpac/ui/icon';
import Link from 'next/link';
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useOverlayTriggerState } from 'react-stately';

export type SearchResult = {
  context?: string;
  href: string;
  label: string;
  pageHref: string;
  searchText: string;
  tab?: string;
};

type SearchContextValue = {
  openSearch: (trigger: HTMLButtonElement) => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children, results }: { children: ReactNode; results: SearchResult[] }) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);
  const state = useOverlayTriggerState({
    onOpenChange: isOpen => {
      if (isOpen) {
        wasOpenRef.current = true;
        return;
      }

      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        setTimeout(() => triggerRef.current?.focus(), 0);
      }
    },
  });
  const [query, setQuery] = useState('');
  const [portalContainer, setPortalContainer] = useState<Element>();
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

    const matches = results.filter(result => result.searchText.toLowerCase().includes(normalizedQuery));
    const matchingPages = new Set(matches.filter(result => !result.tab).map(result => result.pageHref));
    const seenTargets = new Set<string>();

    return matches
      .filter(result => {
        if (result.tab && matchingPages.has(result.pageHref)) {
          return false;
        }

        const target = result.tab ? `${result.pageHref}?tab=${result.tab}` : result.pageHref;
        if (seenTargets.has(target)) {
          return false;
        }
        seenTargets.add(target);
        return true;
      })
      .slice(0, 10);
  }, [normalizedQuery, results]);

  if (!normalizedQuery) {
    resultsContent = (
      <p className="py-3 typography-body-10 text-text-muted">Enter a search term to find pages and guidance.</p>
    );
  } else if (matchingResults.length) {
    resultsContent = (
      <ul aria-label="Search results" className="divide-y divide-border-muted-soft">
        {matchingResults.map((result, index) => (
          <li key={`${result.href}-${result.context ?? 'page'}-${index}`}>
            <Link
              className="block rounded px-3 py-3 text-text-body hover:bg-surface-muted-faint focus-visible:focus-outline"
              href={result.href}
              onClick={() => state.close()}
            >
              <span className="block typography-body-10 font-bold">{result.label}</span>
              {result.context && (
                <span className="mt-1 block typography-body-11 text-text-muted">{result.context}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    resultsContent = <p className="py-3 typography-body-10 text-text-muted">No results found.</p>;
  }

  return (
    <SearchContext.Provider
      value={{
        openSearch: trigger => {
          setQuery('');
          triggerRef.current = trigger;
          setPortalContainer(document.querySelector('[data-brand]') ?? document.body);
          state.open();
        },
      }}
    >
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
          <label className="flex flex-col gap-1.5 typography-body-10 text-text-body">
            Search pages and guidance
            <input
              autoFocus
              className="w-full rounded border border-border-muted-soft bg-background-white px-3 py-2 typography-body-10 text-text-body focus-visible:focus-outline"
              onChange={event => setQuery(event.target.value)}
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
          </label>
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
    <Button
      className={className}
      iconBefore={SearchIcon}
      look="faint"
      onClick={event => context.openSearch(event.currentTarget as HTMLButtonElement)}
      soft
    >
      Search
    </Button>
  );
}

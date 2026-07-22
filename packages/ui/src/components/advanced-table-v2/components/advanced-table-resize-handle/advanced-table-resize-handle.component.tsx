'use client';

import { flexRender } from '@tanstack/react-table';
import { KeyboardEvent, useEffect, useMemo, useRef } from 'react';

import { useAdvancedTableContext } from '../../advanced-table.context.js';

import { styles as resizeHandleStyles } from './advanced-table-resize-handle.styles.js';
import { AdvancedTableResizeHandleProps } from './advanced-table-resize-handle.types.js';

// Steps with keyboard resize move in px
const STEP = 10;
const SHIFT_STEP = 50;

/** Resize handle at a header cell's right edge: drag, or focus + arrow keys/Enter/Space. */
export function AdvancedTableResizeHandle<T>({ header }: AdvancedTableResizeHandleProps<T>) {
  const { table, loading, onResizeAnnouncement } = useAdvancedTableContext<T>();
  const { column } = header;
  const styles = resizeHandleStyles();

  const columnName = useMemo(() => {
    const title = flexRender(column.columnDef.header, header.getContext());
    return typeof title === 'string' ? title : column.id;
  }, [column, header]);

  const size = column.getSize();
  const minSize = column.columnDef.minSize ?? 0;
  const maxSize = column.columnDef.maxSize;

  // Announces a mouse/touch drag's end, keyboard announcement is in separate `handleKeyDown()`
  const wasResizingRef = useRef(false);
  const isResizingColumn = table.getState().columnSizingInfo.isResizingColumn === column.id;
  useEffect(() => {
    if (wasResizingRef.current && !isResizingColumn) {
      onResizeAnnouncement?.(`${columnName} resized to ${column.getSize()}px.`);
    }
    wasResizingRef.current = isResizingColumn;
  }, [isResizingColumn, columnName, column, onResizeAnnouncement]);

  const resetSize = () => {
    column.resetSize();
    onResizeAnnouncement?.(`${columnName} reset to default width.`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (loading) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const step = event.shiftKey ? SHIFT_STEP : STEP;
      const delta = event.key === 'ArrowRight' ? step : -step;
      const updatedWidth = Math.max(minSize, column.getSize() + delta);
      table.setColumnSizing(prev => ({ ...prev, [column.id]: updatedWidth }));
      onResizeAnnouncement?.(`${columnName} resized to ${updatedWidth}px.`);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.key === ' ') event.preventDefault();
      resetSize();
    }
  };

  const resizeHandler = header.getResizeHandler();

  return (
    <div
      aria-label={`Resize ${columnName} column`}
      aria-valuemin={minSize}
      aria-valuenow={size}
      aria-valuetext={`${size} pixels`}
      {...(maxSize !== undefined ? { 'aria-valuemax': maxSize } : {})}
      className={styles.handle()}
      onDoubleClick={loading ? undefined : resetSize}
      onKeyDown={handleKeyDown}
      onMouseDown={loading ? undefined : resizeHandler}
      onTouchStart={loading ? undefined : resizeHandler}
      role="slider"
      tabIndex={loading ? -1 : 0}
    >
      <span className={styles.bar()} />
    </div>
  );
}

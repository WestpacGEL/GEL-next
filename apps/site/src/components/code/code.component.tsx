'use client';
import React, { Fragment, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { LiveProvider } from 'react-live';
import { useOverlayTriggerState } from 'react-stately';

import { StaticCode } from '../static-code';

import * as UISystemComponents from './code.inject-components';
import { CodeProps } from './code.types';
import { LiveCode } from './components/live-code';

const LIVE_SCOPE = {
  ...UISystemComponents,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  useOverlayTriggerState,
  Fragment,
  React,
};

export function Code({
  children,
  live,
  showCode,
  showResponsiveDemo = false,
  className,
  language = 'tsx',
  enableLiveCode = true,
}: CodeProps) {
  if (typeof children !== 'string') return null;
  const childrenAsString = children.trim();

  if (live) {
    return (
      <LiveProvider code={childrenAsString} scope={LIVE_SCOPE} language={language}>
        <LiveCode
          showCode={showCode}
          showResponsiveDemo={showResponsiveDemo}
          className={className}
          enableLiveCode={enableLiveCode}
        />
      </LiveProvider>
    );
  }

  return <StaticCode language="tsx" code={childrenAsString} />;
}

import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { Home } from '@/pages/home.page';

import { CreditCardsLayout } from './layouts/credit-card.layout';
import { RootLayout } from './layouts/root.layout';
import { CreditCardHome } from './pages/credit-cards/credit-card-home.page';
import { ErrorPage } from './pages/error.page';
import { NoProgressRopePage } from './pages/no-progress.page';
import { SuccessPage } from './pages/success.page';
import { TaskCompletionMessagingPage } from './pages/task-completion-messaging.page';

export function App() {
  return (
    // <ErrorBoundary fallbackRender={renderError}>
    <RootLayout>
      <Suspense>
        <Routes>
          <Route element={<Home />} index={true} />
          <Route element={<ErrorPage />} path="error" />
          <Route element={<NoProgressRopePage />} path="no-progress" />
          <Route element={<SuccessPage />} path="success" />
          <Route element={<TaskCompletionMessagingPage />} path="task-completion-messaging" />
          <Route path="credit-cards" element={<CreditCardsLayout />}>
            <Route index element={<CreditCardHome />} />
            {/* <Route path="income-and-savings" element={<Incomeand />} />
							<Route path="loans-and-cards" element={<Incomeand />} />
							<Route path="home-life" element={<Incomeand />} />
							<Route path="credit-limit" element={<Incomeand />} />
							<Route path="name-and-contact" element={<Incomeand />} />
							<Route path="address" element={<Incomeand />} />
							<Route path="review-and-submit" element={<Incomeand />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </RootLayout>
    // </ErrorBoundary>
  );
}

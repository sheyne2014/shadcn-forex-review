import { redirect } from 'next/navigation';

export default function SwingTradingRedirect() {
  redirect('/best-brokers/swing');
  
  // The following will never be rendered because of the redirect
  return null;
} 
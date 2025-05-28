// Google Analytics 4 Configuration and Event Tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics Measurement ID - Replace with your actual GA4 Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Configure GA4
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
    // Enhanced ecommerce and user engagement
    allow_google_signals: true,
    allow_ad_personalization_signals: true,
    // Custom parameters for broker platform
    custom_map: {
      'custom_parameter_1': 'broker_name',
      'custom_parameter_2': 'user_action',
      'custom_parameter_3': 'page_category'
    }
  });
};

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: title || document.title,
    page_location: url,
    send_page_view: true
  });
};

// Enhanced event tracking interface
interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  broker_name?: string;
  user_action?: string;
  page_category?: string;
  custom_parameters?: Record<string, any>;
}

// Generic event tracking
export const trackEvent = ({
  action,
  category,
  label,
  value,
  broker_name,
  user_action,
  page_category,
  custom_parameters = {}
}: GAEvent) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    broker_name: broker_name,
    user_action: user_action,
    page_category: page_category,
    ...custom_parameters
  });
};

// Specific event tracking functions for broker platform

// Visit Site button tracking
export const trackVisitSite = (brokerName: string, brokerUrl: string, pageLocation: string) => {
  trackEvent({
    action: 'visit_site',
    category: 'broker_interaction',
    label: brokerName,
    broker_name: brokerName,
    user_action: 'external_visit',
    page_category: 'broker_review',
    custom_parameters: {
      broker_url: brokerUrl,
      source_page: pageLocation,
      click_type: 'visit_site_button'
    }
  });

  // Also track as conversion event
  window.gtag('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'broker_conversion',
    event_label: brokerName,
    value: 1
  });
};

// Quiz interaction tracking
export const trackQuizInteraction = (action: string, questionNumber?: number, answer?: string, quizType?: string) => {
  trackEvent({
    action: 'quiz_interaction',
    category: 'user_engagement',
    label: action,
    user_action: action,
    page_category: 'quiz',
    custom_parameters: {
      quiz_type: quizType || 'broker_finder',
      question_number: questionNumber,
      answer: answer,
      interaction_type: action
    }
  });
};

// Quiz completion tracking
export const trackQuizCompletion = (quizType: string, results: any, timeSpent: number) => {
  trackEvent({
    action: 'quiz_completed',
    category: 'user_engagement',
    label: quizType,
    value: timeSpent,
    user_action: 'quiz_completion',
    page_category: 'quiz',
    custom_parameters: {
      quiz_type: quizType,
      recommended_brokers: results.recommendedBrokers?.length || 0,
      time_spent_seconds: timeSpent,
      completion_rate: 100
    }
  });

  // Track as conversion
  window.gtag('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'quiz_conversion',
    event_label: quizType,
    value: 1
  });
};

// Broker comparison tracking
export const trackBrokerComparison = (broker1: string, broker2: string, comparisonType: string) => {
  trackEvent({
    action: 'broker_comparison',
    category: 'broker_interaction',
    label: `${broker1} vs ${broker2}`,
    user_action: 'compare_brokers',
    page_category: 'comparison',
    custom_parameters: {
      broker_1: broker1,
      broker_2: broker2,
      comparison_type: comparisonType
    }
  });
};

// Search tracking
export const trackSearch = (searchTerm: string, searchType: string, resultsCount: number) => {
  trackEvent({
    action: 'search',
    category: 'user_engagement',
    label: searchTerm,
    value: resultsCount,
    user_action: 'search',
    page_category: 'search',
    custom_parameters: {
      search_term: searchTerm,
      search_type: searchType,
      results_count: resultsCount
    }
  });
};

// Newsletter signup tracking
export const trackNewsletterSignup = (source: string) => {
  trackEvent({
    action: 'newsletter_signup',
    category: 'user_engagement',
    label: source,
    user_action: 'newsletter_signup',
    page_category: 'engagement',
    custom_parameters: {
      signup_source: source
    }
  });
};

// Download tracking (for guides, PDFs, etc.)
export const trackDownload = (fileName: string, fileType: string, source: string) => {
  trackEvent({
    action: 'file_download',
    category: 'user_engagement',
    label: fileName,
    user_action: 'download',
    page_category: 'content',
    custom_parameters: {
      file_name: fileName,
      file_type: fileType,
      download_source: source
    }
  });
};

// Social share tracking
export const trackSocialShare = (platform: string, contentType: string, contentTitle: string) => {
  trackEvent({
    action: 'social_share',
    category: 'user_engagement',
    label: platform,
    user_action: 'share',
    page_category: 'social',
    custom_parameters: {
      social_platform: platform,
      content_type: contentType,
      content_title: contentTitle
    }
  });
};

// Error tracking
export const trackError = (errorType: string, errorMessage: string, pageLocation: string) => {
  trackEvent({
    action: 'error',
    category: 'technical',
    label: errorType,
    user_action: 'error_encountered',
    page_category: 'error',
    custom_parameters: {
      error_type: errorType,
      error_message: errorMessage,
      page_location: pageLocation
    }
  });
};

// User timing tracking (for performance monitoring)
export const trackTiming = (category: string, variable: string, time: number, label?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'timing_complete', {
    name: variable,
    value: time,
    event_category: category,
    event_label: label
  });
};

// Enhanced ecommerce tracking for broker referrals
export const trackBrokerReferral = (brokerName: string, referralValue: number, currency: string = 'USD') => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'purchase', {
    transaction_id: `ref_${Date.now()}_${brokerName.toLowerCase().replace(/\s+/g, '_')}`,
    value: referralValue,
    currency: currency,
    items: [{
      item_id: brokerName.toLowerCase().replace(/\s+/g, '_'),
      item_name: `${brokerName} Referral`,
      category: 'broker_referral',
      quantity: 1,
      price: referralValue
    }]
  });
};

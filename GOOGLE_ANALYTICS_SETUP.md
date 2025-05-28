# Google Analytics 4 Setup Guide

This guide will help you set up Google Analytics 4 (GA4) with comprehensive event tracking for your broker review platform.

## 📋 Prerequisites

- Google Analytics 4 property created
- Google Tag Manager (optional but recommended)
- Next.js application with the analytics components installed

## 🚀 Quick Setup

### 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Environment Configuration

Add your GA4 Measurement ID to your environment variables:

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Verify Installation

The Google Analytics provider is already integrated into your application. Once you add the measurement ID, analytics will start tracking automatically.

## 📊 Available Tracking Events

### Visit Site Button Tracking
- **Event**: `visit_site`
- **Category**: `broker_interaction`
- **Triggers**: When users click "Visit Site" buttons
- **Data Captured**:
  - Broker name
  - Source page
  - UTM parameters
  - Referral value

### Quiz Interactions
- **Event**: `quiz_interaction`
- **Category**: `user_engagement`
- **Triggers**: Quiz start, question answers, completion, abandonment
- **Data Captured**:
  - Quiz type
  - Question number
  - Answer selected
  - Time spent
  - Completion rate

### Broker Comparisons
- **Event**: `broker_comparison`
- **Category**: `broker_interaction`
- **Triggers**: When users compare brokers
- **Data Captured**:
  - Brokers being compared
  - Comparison type
  - Source page

### Search Tracking
- **Event**: `search`
- **Category**: `user_engagement`
- **Triggers**: Site search usage
- **Data Captured**:
  - Search terms
  - Results count
  - Search type

## 🔧 Component Usage

### Using VisitSiteButton with Analytics

```tsx
import { VisitSiteButton, VisitSiteButtonPresets } from '@/components/analytics/VisitSiteButton';

// Basic usage
<VisitSiteButton
  brokerName="eToro"
  brokerUrl="https://etoro.com"
  {...VisitSiteButtonPresets.brokerCard}
/>

// Custom tracking data
<VisitSiteButton
  brokerName="XM"
  brokerUrl="https://xm.com"
  trackingData={{
    source: 'hero_section',
    referralValue: 100,
    campaign: 'special_offer'
  }}
/>
```

### Quiz Analytics Integration

```tsx
import { QuizAnalyticsWrapper } from '@/components/analytics/QuizAnalyticsWrapper';

<QuizAnalyticsWrapper quizType="broker_finder" quizId="main_quiz">
  <YourQuizComponent />
</QuizAnalyticsWrapper>
```

### Manual Event Tracking

```tsx
import { trackEvent, trackVisitSite, trackQuizCompletion } from '@/lib/analytics/google-analytics';

// Custom event
trackEvent({
  action: 'custom_action',
  category: 'user_engagement',
  label: 'button_click',
  value: 1
});

// Visit site tracking
trackVisitSite('eToro', 'https://etoro.com', window.location.href);

// Quiz completion
trackQuizCompletion('broker_finder', results, timeSpent);
```

## 📈 Analytics Dashboard

Access the analytics dashboard at `/analytics-dashboard` (admin only) to view:

- Visit site click metrics
- Quiz completion rates
- Top performing brokers
- Conversion tracking
- Real-time events

## 🎯 Conversion Tracking

### Enhanced Ecommerce Events

The system automatically tracks conversions as enhanced ecommerce events:

```javascript
// Automatic conversion tracking for visit site clicks
gtag('event', 'purchase', {
  transaction_id: 'ref_timestamp_broker',
  value: referralValue,
  currency: 'USD',
  items: [{
    item_id: 'broker_id',
    item_name: 'Broker Referral',
    category: 'broker_referral',
    quantity: 1,
    price: referralValue
  }]
});
```

### Custom Conversions

Set up custom conversions in GA4 for:
- Quiz completions
- Broker visits
- Newsletter signups
- Download events

## 🔍 UTM Parameter Tracking

All visit site buttons automatically add UTM parameters:

- `utm_source=brokeranalysis`
- `utm_medium=referral`
- `utm_campaign=broker_review` (or custom)
- `utm_content=visit_site_brokername`
- `ref_broker=BrokerName`
- `ref_timestamp=timestamp`

## 📊 Google Analytics 4 Configuration

### Recommended Events to Track as Conversions

1. **visit_site** - Primary conversion goal
2. **quiz_completed** - Engagement conversion
3. **newsletter_signup** - Lead generation
4. **file_download** - Content engagement

### Custom Dimensions

Set up these custom dimensions in GA4:

1. **Broker Name** - Track which brokers get the most attention
2. **User Action** - Categorize user behaviors
3. **Page Category** - Segment by page types
4. **Quiz Type** - Track different quiz performances
5. **Source Page** - Understand traffic flow

### Audiences

Create audiences for:
- Quiz completers
- High-value visitors (multiple broker visits)
- Engaged users (long session duration)
- Conversion-ready users

## 🚨 Privacy & GDPR Compliance

The analytics implementation includes:

- Consent management ready
- IP anonymization enabled
- Cookie consent integration
- Data retention controls
- User opt-out functionality

### Cookie Consent Integration

```tsx
// Example consent integration
if (userConsent.analytics) {
  initGA();
} else {
  // Disable analytics
  window['ga-disable-' + GA_MEASUREMENT_ID] = true;
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Events not showing in GA4**
   - Check measurement ID is correct
   - Verify events in GA4 DebugView
   - Ensure proper consent given

2. **Development vs Production**
   - Analytics disabled in development by default
   - Set `NODE_ENV=production` to enable

3. **Hydration Issues**
   - Analytics provider handles SSR properly
   - Events only fire on client-side

### Debug Mode

Enable debug mode in development:

```javascript
gtag('config', GA_MEASUREMENT_ID, {
  debug_mode: true
});
```

## 📚 Additional Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Custom Events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

## 🎉 Success Metrics

After setup, you should see:

- ✅ Page views tracking automatically
- ✅ Visit site button clicks with broker attribution
- ✅ Quiz interactions and completion rates
- ✅ Conversion events with proper values
- ✅ UTM parameter tracking
- ✅ Enhanced ecommerce data

Your broker review platform now has comprehensive analytics tracking to optimize user experience and conversion rates!

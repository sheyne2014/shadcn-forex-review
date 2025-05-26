/**
 * Blog Post Automation Scheduler
 * Handles the scheduling and management of automated blog post generation
 */

export interface ScheduleConfig {
  frequency: 'daily' | 'weekly' | 'custom';
  postsPerWeek: number;
  timeOfDay: string; // HH:MM format
  timezone: string;
  enabled: boolean;
}

export interface BlogGenerationStats {
  totalGenerated: number;
  successfulPosts: number;
  failedAttempts: number;
  lastGenerated: string;
  nextScheduled: string;
}

/**
 * Default schedule configuration
 */
export const DEFAULT_SCHEDULE: ScheduleConfig = {
  frequency: 'custom',
  postsPerWeek: 3,
  timeOfDay: '09:00',
  timezone: 'UTC',
  enabled: true
};

/**
 * Calculate next scheduled run based on configuration
 */
export function calculateNextRun(config: ScheduleConfig, lastRun?: Date): Date {
  const now = new Date();
  const [hours, minutes] = config.timeOfDay.split(':').map(Number);
  
  if (config.frequency === 'daily') {
    const nextRun = new Date(now);
    nextRun.setHours(hours, minutes, 0, 0);
    
    // If time has passed today, schedule for tomorrow
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
    
    return nextRun;
  }
  
  if (config.frequency === 'weekly') {
    const nextRun = new Date(now);
    nextRun.setHours(hours, minutes, 0, 0);
    
    // Schedule for next Monday
    const daysUntilMonday = (8 - nextRun.getDay()) % 7;
    nextRun.setDate(nextRun.getDate() + daysUntilMonday);
    
    return nextRun;
  }
  
  // Custom frequency based on postsPerWeek
  const daysInterval = Math.floor(7 / config.postsPerWeek);
  const nextRun = new Date(lastRun || now);
  nextRun.setDate(nextRun.getDate() + daysInterval);
  nextRun.setHours(hours, minutes, 0, 0);
  
  return nextRun;
}

/**
 * Generate cron expression for the schedule
 */
export function generateCronExpression(config: ScheduleConfig): string {
  const [hours, minutes] = config.timeOfDay.split(':').map(Number);
  
  if (config.frequency === 'daily') {
    return `${minutes} ${hours} * * *`;
  }
  
  if (config.frequency === 'weekly') {
    return `${minutes} ${hours} * * 1`; // Every Monday
  }
  
  // Custom frequency - generate multiple cron expressions for posts per week
  const expressions: string[] = [];
  const daysInterval = Math.floor(7 / config.postsPerWeek);
  
  for (let i = 0; i < config.postsPerWeek; i++) {
    const dayOfWeek = (i * daysInterval) % 7;
    expressions.push(`${minutes} ${hours} * * ${dayOfWeek}`);
  }
  
  return expressions.join(', ');
}

/**
 * Validate schedule configuration
 */
export function validateScheduleConfig(config: ScheduleConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (config.postsPerWeek < 1 || config.postsPerWeek > 14) {
    errors.push('Posts per week must be between 1 and 14');
  }
  
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(config.timeOfDay)) {
    errors.push('Time of day must be in HH:MM format');
  }
  
  const validTimezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
  if (!validTimezones.includes(config.timezone)) {
    errors.push('Invalid timezone specified');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Blog automation manager class
 */
export class BlogAutomationManager {
  private config: ScheduleConfig;
  private stats: BlogGenerationStats;
  
  constructor(config: ScheduleConfig = DEFAULT_SCHEDULE) {
    this.config = config;
    this.stats = {
      totalGenerated: 0,
      successfulPosts: 0,
      failedAttempts: 0,
      lastGenerated: '',
      nextScheduled: calculateNextRun(config).toISOString()
    };
  }
  
  /**
   * Update schedule configuration
   */
  updateConfig(newConfig: Partial<ScheduleConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.stats.nextScheduled = calculateNextRun(this.config).toISOString();
  }
  
  /**
   * Get current configuration
   */
  getConfig(): ScheduleConfig {
    return { ...this.config };
  }
  
  /**
   * Get generation statistics
   */
  getStats(): BlogGenerationStats {
    return { ...this.stats };
  }
  
  /**
   * Record successful blog generation
   */
  recordSuccess(): void {
    this.stats.totalGenerated++;
    this.stats.successfulPosts++;
    this.stats.lastGenerated = new Date().toISOString();
    this.stats.nextScheduled = calculateNextRun(this.config, new Date()).toISOString();
  }
  
  /**
   * Record failed blog generation attempt
   */
  recordFailure(): void {
    this.stats.totalGenerated++;
    this.stats.failedAttempts++;
    // Don't update lastGenerated on failure
    this.stats.nextScheduled = calculateNextRun(this.config, new Date()).toISOString();
  }
  
  /**
   * Check if it's time to generate a new blog post
   */
  shouldGenerate(): boolean {
    if (!this.config.enabled) {
      return false;
    }
    
    const now = new Date();
    const nextScheduled = new Date(this.stats.nextScheduled);
    
    return now >= nextScheduled;
  }
  
  /**
   * Get time until next scheduled generation
   */
  getTimeUntilNext(): number {
    const now = new Date();
    const nextScheduled = new Date(this.stats.nextScheduled);
    
    return Math.max(0, nextScheduled.getTime() - now.getTime());
  }
  
  /**
   * Generate status report
   */
  getStatusReport(): string {
    const successRate = this.stats.totalGenerated > 0 
      ? (this.stats.successfulPosts / this.stats.totalGenerated * 100).toFixed(1)
      : '0';
    
    const timeUntilNext = this.getTimeUntilNext();
    const hoursUntilNext = Math.floor(timeUntilNext / (1000 * 60 * 60));
    const minutesUntilNext = Math.floor((timeUntilNext % (1000 * 60 * 60)) / (1000 * 60));
    
    return `
Blog Automation Status:
- Enabled: ${this.config.enabled ? 'Yes' : 'No'}
- Posts per week: ${this.config.postsPerWeek}
- Schedule: ${this.config.frequency} at ${this.config.timeOfDay} ${this.config.timezone}
- Total generated: ${this.stats.totalGenerated}
- Success rate: ${successRate}%
- Last generated: ${this.stats.lastGenerated || 'Never'}
- Next scheduled: ${this.stats.nextScheduled}
- Time until next: ${hoursUntilNext}h ${minutesUntilNext}m
    `.trim();
  }
}

/**
 * Singleton instance for global use
 */
export const blogAutomation = new BlogAutomationManager();

/**
 * Environment variable validation for blog automation
 */
export function validateBlogAutomationEnv(): { valid: boolean; missing: string[] } {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'BLOG_AUTOMATION_SECRET'
  ];
  
  const optional = [
    'CONTEXT7_API_KEY',
    'OPENAI_API_KEY',
    'ANTHROPIC_API_KEY',
    'GOOGLE_SEARCH_API_KEY',
    'GOOGLE_SEARCH_ENGINE_ID',
    'BING_SEARCH_API_KEY',
    'UNSPLASH_ACCESS_KEY'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  const hasAtLeastOneAI = optional.slice(0, 3).some(key => process.env[key]);
  const hasAtLeastOneSearch = optional.slice(3, 6).some(key => process.env[key]);
  
  if (!hasAtLeastOneAI) {
    missing.push('At least one AI API key (CONTEXT7_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY)');
  }
  
  if (!hasAtLeastOneSearch) {
    console.warn('No search API keys found. Web search will use fallback methods.');
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
}

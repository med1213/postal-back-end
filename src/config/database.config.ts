import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mariadb',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'laos_postal',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true' || false,
    logging: process.env.DB_LOGGING === 'true' || false,
    autoLoadEntities: true,
  }),
);

// JWT Configuration
export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'fallback-secret-key-for-development-only',
  refreshSecret:
    process.env.JWT_REFRESH_SECRET ||
    'fallback-refresh-secret-key-for-development-only',
  accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '15m',
  refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d',
}));

// Cookie Configuration
export const cookieConfig = registerAs('cookie', () => ({
  domain: process.env.COOKIE_DOMAIN || 'localhost',
  secure:
    process.env.COOKIE_SECURE === 'true' ||
    process.env.NODE_ENV === 'production',
  sameSite:
    (process.env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none') || 'strict',
  httpOnly: process.env.COOKIE_HTTP_ONLY !== 'false', // Default to true
}));

// Rate Limiting Configuration
export const rateLimitConfig = registerAs('rateLimit', () => ({
  loginAttempts: parseInt(process.env.RATE_LIMIT_LOGIN_ATTEMPTS || '5', 10),
  loginWindow: parseInt(process.env.RATE_LIMIT_LOGIN_WINDOW || '900000', 10), // 15 minutes
  refreshAttempts: parseInt(
    process.env.RATE_LIMIT_REFRESH_ATTEMPTS || '10',
    10,
  ),
  refreshWindow: parseInt(process.env.RATE_LIMIT_REFRESH_WINDOW || '60000', 10), // 1 minute
  accountLockoutDuration: parseInt(
    process.env.ACCOUNT_LOCKOUT_DURATION || '1800000',
    10,
  ), // 30 minutes
}));

// Security Configuration
export const securityConfig = registerAs('security', () => ({
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  sessionCleanupInterval: parseInt(
    process.env.SESSION_CLEANUP_INTERVAL || '3600000',
    10,
  ), // 1 hour
}));

import { DataSource } from 'typeorm';
import { District } from '../modules/postal/district.entity';
import { districts } from './districts.seeder';

async function runSeeders() {
  const dataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'laos_postal',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  });

  try {
    await dataSource.initialize();
    console.log('✓ Database connection established');

    const districtRepository = dataSource.getRepository(District);

    // Clear existing data
    await districtRepository.clear();
    console.log('✓ Cleared existing districts');

    // Insert districts
    await districtRepository.insert(districts);
    console.log(`✓ Seeded ${districts.length} districts successfully`);

    await dataSource.destroy();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
}

runSeeders();

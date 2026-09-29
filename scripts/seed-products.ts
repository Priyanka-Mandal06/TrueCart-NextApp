import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../src/models/Product';

dotenv.config({ path: '.env.local' });

const products = [
  {
    title: 'Apple iPhone 17 Pro',
    description:
      'Apple iPhone 17 Pro with a premium titanium design, advanced camera system, powerful performance and a high-quality display.',
    price: 134999,
    discountPercentage: 8,
    rating: 4.8,
    type: 'Smartphone',
    stock: 20,
    brand: 'Apple',
    category: 'Mobiles',

    // Working smartphone image
    thumbnail:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',

    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ],

    colors: ['Cosmic Orange', 'Deep Blue', 'Silver'],
    sizes: [],
    highlights: [
      'Pro camera system',
      'Advanced performance',
      'Premium titanium design',
      'High-resolution display',
    ],
    discountPrice: 146999,
  },

  {
    title: 'Samsung Galaxy S24',
    description: 'Samsung flagship smartphone with an AMOLED display and powerful performance.',
    price: 74999,
    discountPercentage: 8,
    rating: 4.6,
    type: 'Smartphone',
    stock: 20,
    brand: 'Samsung',
    category: 'Mobiles',
    thumbnail:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Black', 'Silver'],
    sizes: [],
    highlights: ['AMOLED display', 'High-performance processor', 'Advanced camera'],
    discountPrice: 81999,
  },

  {
    title: 'OnePlus 12',
    description: 'High-performance OnePlus smartphone with fast charging and a premium display.',
    price: 64999,
    discountPercentage: 12,
    rating: 4.5,
    type: 'Smartphone',
    stock: 18,
    brand: 'OnePlus',
    category: 'Mobiles',
    thumbnail:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Green', 'Black'],
    sizes: [],
    highlights: ['Fast charging', 'High refresh rate display', 'Powerful processor'],
    discountPrice: 73999,
  },

  {
    title: 'Xiaomi Redmi Note 13',
    description: 'Affordable smartphone with a high-resolution display and long-lasting battery.',
    price: 19999,
    discountPercentage: 15,
    rating: 4.3,
    type: 'Smartphone',
    stock: 30,
    brand: 'Xiaomi',
    category: 'Mobiles',
    thumbnail:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Blue', 'Black'],
    sizes: [],
    highlights: ['High-resolution display', 'Large battery', 'Fast charging'],
    discountPrice: 23499,
  },

  {
    title: 'Apple MacBook Air M2',
    description: 'Lightweight Apple laptop powered by the M2 chip for everyday productivity.',
    price: 99999,
    discountPercentage: 7,
    rating: 4.8,
    type: 'Laptop',
    stock: 12,
    brand: 'Apple',
    category: 'Laptops',
    thumbnail:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Silver', 'Space Gray'],
    sizes: ['13 inch'],
    highlights: ['Apple M2 chip', 'Retina display', 'Long battery life'],
    discountPrice: 107499,
  },

  {
    title: 'Dell Inspiron 15',
    description: 'Versatile Dell laptop suitable for work, study and everyday computing.',
    price: 58999,
    discountPercentage: 10,
    rating: 4.2,
    type: 'Laptop',
    stock: 15,
    brand: 'Dell',
    category: 'Laptops',
    thumbnail:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Silver'],
    sizes: ['15.6 inch'],
    highlights: ['Full HD display', 'Fast SSD storage', 'Comfortable keyboard'],
    discountPrice: 64999,
  },

  {
    title: 'Sony WH-1000XM5',
    description: 'Premium wireless headphones with active noise cancellation.',
    price: 29999,
    discountPercentage: 12,
    rating: 4.7,
    type: 'Headphones',
    stock: 22,
    brand: 'Sony',
    category: 'Accessories',
    thumbnail:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Black', 'Silver'],
    sizes: [],
    highlights: ['Active noise cancellation', 'Wireless connectivity', 'Long battery life'],
    discountPrice: 33999,
  },

  {
    title: 'Apple Watch Series 9',
    description: 'Smartwatch with health tracking, notifications and fitness features.',
    price: 41999,
    discountPercentage: 9,
    rating: 4.6,
    type: 'Smartwatch',
    stock: 14,
    brand: 'Apple',
    category: 'Smart watches',
    thumbnail:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Black', 'Silver'],
    sizes: ['41mm', '45mm'],
    highlights: ['Fitness tracking', 'Heart rate monitoring', 'Smart notifications'],
    discountPrice: 45999,
  },

  {
    title: 'Samsung 55 Inch 4K Smart TV',
    description: '4K smart television with a large display and modern entertainment features.',
    price: 54999,
    discountPercentage: 15,
    rating: 4.4,
    type: 'Television',
    stock: 10,
    brand: 'Samsung',
    category: 'TV & Display',
    thumbnail:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Black'],
    sizes: ['55 inch'],
    highlights: ['4K resolution', 'Smart TV features', 'Large display'],
    discountPrice: 64999,
  },

  {
    title: 'Apple iPad Air',
    description: 'Powerful and lightweight tablet for entertainment, creativity and productivity.',
    price: 59999,
    discountPercentage: 10,
    rating: 4.6,
    type: 'Tablet',
    stock: 16,
    brand: 'Apple',
    category: 'Tablet',
    thumbnail:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Blue', 'Gray'],
    sizes: ['11 inch'],
    highlights: ['High-resolution display', 'Powerful processor', 'Long battery life'],
    discountPrice: 65999,
  },

  {
    title: 'Realme Buds Wireless 3',
    description: 'Wireless neckband earphones with immersive audio and long battery life.',
    price: 2299,
    discountPercentage: 20,
    rating: 4.2,
    type: 'Earphones',
    stock: 35,
    brand: 'Realme',
    category: 'Accessories',
    thumbnail:
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Black', 'Blue'],
    sizes: [],
    highlights: ['Wireless audio', 'Long battery life', 'Fast charging'],
    discountPrice: 2899,
  },

  {
    title: 'OnePlus 12R',
    description:
      'OnePlus 12R with a smooth AMOLED display, powerful performance and a large battery for all-day use.',
    price: 39999,
    discountPercentage: 10,
    rating: 4.5,
    type: 'Smartphone',
    stock: 30,
    brand: 'OnePlus',
    category: 'Mobiles',
    thumbnail:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Cool Blue', 'Iron Gray'],
    sizes: [],
    highlights: [
      '6.78 inch AMOLED display',
      'Powerful Snapdragon processor',
      '5500mAh battery',
      'Fast charging',
    ],
    discountPrice: 44999,
  },
];

async function seedProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined.');
    }

    console.log('Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully.\n');

    // Remove the old product that is no longer part of our dataset.
    const removed = await Product.deleteOne({
      title: 'Apple iPhone 15',
    });

    if (removed.deletedCount > 0) {
      console.log('🗑️ Removed old Apple iPhone 15');
    }

    let inserted = 0;
    let updated = 0;

    for (const product of products) {
      const existingProduct = await Product.findOne({
        title: product.title,
      });

      if (existingProduct) {
        await Product.updateOne({ _id: existingProduct._id }, { $set: product });

        console.log(`🔄 Updated: ${product.title}`);
        updated++;
      } else {
        await Product.create(product);

        console.log(`✅ Inserted: ${product.title}`);
        inserted++;
      }
    }

    // Remove any old products that aren't part of our current 12-product dataset.
    const productTitles = products.map((product) => product.title);

    const removedOldProducts = await Product.deleteMany({
      title: { $nin: productTitles },
    });

    if (removedOldProducts.deletedCount > 0) {
      console.log(`🗑️ Removed ${removedOldProducts.deletedCount} old product(s)`);
    }

    const totalProducts = await Product.countDocuments();

    console.log('\n------------------------------');
    console.log('Seed completed!');
    console.log(`Inserted: ${inserted}`);
    console.log(`Updated: ${updated}`);
    console.log(`Total products: ${totalProducts}`);
    console.log('------------------------------');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
}

seedProducts();

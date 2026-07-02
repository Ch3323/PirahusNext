import { prisma } from "./src/lib/prisma";
import { SHOP_ITEMS } from "./src/components/shop/Items";

async function main() {
  console.log("Seeding ShopItems from Items.tsx...");

  for (const item of SHOP_ITEMS) {
    const existing = await prisma.shopItem.findFirst({
      where: { name: item.name },
    });

    if (!existing) {
      await prisma.shopItem.create({
        data: {
          category: item.category,
          name: item.name,
          description: item.description,
          price: item.price,
          icon: item.icon,
          disabled: item.disabled || false,
          effectKey: item.effectKey || null,
          hintLevel: item.hintLevel || null,
        },
      });
      console.log(`Created: ${item.name}`);
    } else {
      console.log(`Skipped (already exists): ${item.name}`);
    }
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

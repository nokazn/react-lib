check:
  biome check ./packages ./.storybook

check-fix:
  biome check ./packages ./.storybook --apply

format:
  treefmt

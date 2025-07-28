export function calculateSlotsToRender(
  items: { order: number }[] | undefined,
  maxInitial: number = 4,
  maxTotal: number = 16,
): number[] {
  const filledOrders = new Set(items?.map((r) => r.order) ?? []);
  const slots: number[] = [];

  const maxOrder = Math.max(...Array.from(filledOrders), maxInitial - 1);
  for (let i = 0; i <= maxOrder; i++) slots.push(i);

  if (slots.length < maxInitial) {
    for (let i = slots.length; i < maxInitial; i++) {
      slots.push(i);
    }
  }

  if ((items?.length ?? 0) >= maxInitial && slots.length < maxTotal) {
    slots.push(slots.length);
  }

  return slots;
}

export function generateTooltips(
  totalSlides: number,
  slidesPerView: number,
): string[] {
  const groups = Math.ceil(totalSlides / slidesPerView);
  return Array.from({ length: groups }).map((_, i) => {
    const start = i * slidesPerView + 1;
    const end = Math.min((i + 1) * slidesPerView, totalSlides);
    return start !== end ? `اسلاید ${end}-${start}` : `اسلاید ${end}`;
  });
}

// values that definde figma for size button (sm, md)
export const sizesButton = {
  sm: 'rounded-md h-[38px]',
  md: 'rounded-lg h-[48px]',
};

// values that definde figma for mode button (primary, secondary, text, underline)
export const modes = {
  primary: {
    default: 'bg-brand-600 active:bg-brand-800 text-white hover:bg-brand-700',
    loading: 'bg-brand-600 text-white',
    disable: 'bg-brand-300 text-white',
  },
  secondary: {
    default:
      'bg-white active:bg-brand-800 border border-brand-600 text-brand-600 hover:bg-brand-700 hover:text-white',
    loading: 'border border-brand-600 text-brand-600',
    disable: 'border-brand-300 border text-brand-300 ',
  },
  text: {
    default:
      'text-brand-600 active:border-brand-800 hover:border hover:border-brand-600',
    loading: 'text-brand-600',
    disable: 'text-brand-300',
  },
  underline: {
    default: 'text-brand-600',
    loading: 'text-brand-600',
    disable: 'text-brand-300',
  },
};

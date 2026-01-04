// Standard darts checkout chart
// Key: remaining score, Value: array of dart combinations (best checkout path)
// Format: [dart1, dart2?, dart3?] where each dart is like "T20", "D16", "25", "Bull"

export type CheckoutPath = string[];

export const CHECKOUT_CHART: Record<number, CheckoutPath> = {
  // 2-dart checkouts from 2-40 (single double finishes)
  2: ['D1'],
  3: ['1', 'D1'],
  4: ['D2'],
  5: ['1', 'D2'],
  6: ['D3'],
  7: ['3', 'D2'],
  8: ['D4'],
  9: ['1', 'D4'],
  10: ['D5'],
  11: ['3', 'D4'],
  12: ['D6'],
  13: ['5', 'D4'],
  14: ['D7'],
  15: ['7', 'D4'],
  16: ['D8'],
  17: ['9', 'D4'],
  18: ['D9'],
  19: ['11', 'D4'],
  20: ['D10'],
  21: ['5', 'D8'],
  22: ['D11'],
  23: ['7', 'D8'],
  24: ['D12'],
  25: ['9', 'D8'],
  26: ['D13'],
  27: ['11', 'D8'],
  28: ['D14'],
  29: ['13', 'D8'],
  30: ['D15'],
  31: ['15', 'D8'],
  32: ['D16'],
  33: ['1', 'D16'],
  34: ['D17'],
  35: ['3', 'D16'],
  36: ['D18'],
  37: ['5', 'D16'],
  38: ['D19'],
  39: ['7', 'D16'],
  40: ['D20'],

  // 2-dart checkouts 41-60
  41: ['9', 'D16'],
  42: ['10', 'D16'],
  43: ['11', 'D16'],
  44: ['12', 'D16'],
  45: ['13', 'D16'],
  46: ['14', 'D16'],
  47: ['15', 'D16'],
  48: ['16', 'D16'],
  49: ['17', 'D16'],
  50: ['Bull'],
  51: ['19', 'D16'],
  52: ['20', 'D16'],
  53: ['13', 'D20'],
  54: ['14', 'D20'],
  55: ['15', 'D20'],
  56: ['16', 'D20'],
  57: ['17', 'D20'],
  58: ['18', 'D20'],
  59: ['19', 'D20'],
  60: ['20', 'D20'],

  // 2-dart checkouts 61-70 (with doubles/triples)
  61: ['T15', 'D8'],
  62: ['T10', 'D16'],
  63: ['T13', 'D12'],
  64: ['T16', 'D8'],
  65: ['T19', 'D4'],
  66: ['T10', 'D18'],
  67: ['T17', 'D8'],
  68: ['T20', 'D4'],
  69: ['T19', 'D6'],
  70: ['T18', 'D8'],

  // 2-dart checkouts 71-80
  71: ['T13', 'D16'],
  72: ['T16', 'D12'],
  73: ['T19', 'D8'],
  74: ['T14', 'D16'],
  75: ['T17', 'D12'],
  76: ['T20', 'D8'],
  77: ['T19', 'D10'],
  78: ['T18', 'D12'],
  79: ['T19', 'D11'],
  80: ['T20', 'D10'],

  // 2-dart checkouts 81-90
  81: ['T19', 'D12'],
  82: ['T14', 'D20'],
  83: ['T17', 'D16'],
  84: ['T20', 'D12'],
  85: ['T15', 'D20'],
  86: ['T18', 'D16'],
  87: ['T17', 'D18'],
  88: ['T20', 'D14'],
  89: ['T19', 'D16'],
  90: ['T20', 'D15'],

  // 2-dart checkouts 91-98
  91: ['T17', 'D20'],
  92: ['T20', 'D16'],
  93: ['T19', 'D18'],
  94: ['T18', 'D20'],
  95: ['T19', 'D19'],
  96: ['T20', 'D18'],
  97: ['T19', 'D20'],
  98: ['T20', 'D19'],

  // 3-dart checkouts 99-110
  99: ['T19', 'T10', 'D6'],
  100: ['T20', 'D20'],
  101: ['T17', 'Bull'],
  102: ['T20', 'T10', 'D6'],
  103: ['T17', '20', 'D16'],
  104: ['T18', 'Bull'],
  105: ['T20', '13', 'D16'],
  106: ['T20', '14', 'D16'],
  107: ['T19', 'Bull'],
  108: ['T20', '16', 'D16'],
  109: ['T20', '17', 'D16'],
  110: ['T20', 'Bull'],

  // Common 3-dart checkouts 111-130
  111: ['T20', '19', 'D16'],
  112: ['T20', '20', 'D16'],
  113: ['T19', '20', 'D18'],
  114: ['T20', '14', 'D20'],
  115: ['T20', '15', 'D20'],
  116: ['T20', '16', 'D20'],
  117: ['T20', '17', 'D20'],
  118: ['T20', '18', 'D20'],
  119: ['T19', 'T10', 'D16'],
  120: ['T20', '20', 'D20'],
  121: ['T20', 'T11', 'D4'],
  122: ['T18', 'T18', 'D7'],
  123: ['T19', 'T16', 'D9'],
  124: ['T20', 'T14', 'D11'],
  125: ['T20', 'T19', 'D4'],
  126: ['T19', 'T19', 'D6'],
  127: ['T20', 'T17', 'D8'],
  128: ['T18', 'T14', 'D16'],
  129: ['T19', 'T16', 'D12'],
  130: ['T20', 'T18', 'D8'],

  // 3-dart checkouts 131-140
  131: ['T20', 'T13', 'D16'],
  132: ['T20', 'T16', 'D12'],
  133: ['T20', 'T19', 'D8'],
  134: ['T20', 'T14', 'D16'],
  135: ['T20', 'T17', 'D12'],
  136: ['T20', 'T20', 'D8'],
  137: ['T20', 'T19', 'D10'],
  138: ['T20', 'T18', 'D12'],
  139: ['T20', 'T19', 'D11'],
  140: ['T20', 'T20', 'D10'],

  // 3-dart checkouts 141-150
  141: ['T20', 'T19', 'D12'],
  142: ['T20', 'T14', 'D20'],
  143: ['T20', 'T17', 'D16'],
  144: ['T20', 'T20', 'D12'],
  145: ['T20', 'T15', 'D20'],
  146: ['T20', 'T18', 'D16'],
  147: ['T20', 'T17', 'D18'],
  148: ['T20', 'T20', 'D14'],
  149: ['T20', 'T19', 'D16'],
  150: ['T20', 'T18', 'D18'],

  // 3-dart checkouts 151-160
  151: ['T20', 'T17', 'D20'],
  152: ['T20', 'T20', 'D16'],
  153: ['T20', 'T19', 'D18'],
  154: ['T20', 'T18', 'D20'],
  155: ['T20', 'T19', 'D19'],
  156: ['T20', 'T20', 'D18'],
  157: ['T20', 'T19', 'D20'],
  158: ['T20', 'T20', 'D19'],
  // 159 is a bogey number - no checkout possible
  160: ['T20', 'T20', 'D20'],

  // High checkouts 161-170
  161: ['T20', 'T17', 'Bull'],
  164: ['T20', 'T18', 'Bull'],
  167: ['T20', 'T19', 'Bull'],
  170: ['T20', 'T20', 'Bull'],
};

// Scores that are impossible to checkout (bogey numbers)
export const BOGEY_NUMBERS = [159, 162, 163, 165, 166, 168, 169];

// Maximum possible checkout
export const MAX_CHECKOUT = 170;

// Get checkout suggestion for a given score
export function getCheckoutSuggestion(score: number): CheckoutPath | null {
  if (score < 2 || score > MAX_CHECKOUT) return null;
  if (BOGEY_NUMBERS.includes(score)) return null;
  return CHECKOUT_CHART[score] || null;
}

// Check if a score is checkable (can be finished)
export function isCheckable(score: number): boolean {
  return score >= 2 && score <= MAX_CHECKOUT && !BOGEY_NUMBERS.includes(score);
}

// Get the number of darts needed to checkout
export function getDartsNeeded(score: number): number | null {
  const checkout = getCheckoutSuggestion(score);
  if (!checkout) return null;
  return checkout.length;
}

// Format checkout path for display
export function formatCheckoutPath(path: CheckoutPath): string {
  return path.join(' → ');
}

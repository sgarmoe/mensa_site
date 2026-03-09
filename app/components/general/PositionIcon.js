/**
 * PositionIcon
 *
 * Props:
 *   slot  — roster slot (QB, FLEX, SUPER_FLEX, etc.) or player position
 *   size  — "sm" | "md" (default "sm")
 *
 * Single positions render one colored badge.
 * Flex slots render one segmented pill — each eligible position gets its own
 * color section inside a single rounded container.
 */

const POSITION_STYLE = {
  QB:  { bg: '#dc2626', label: 'QB' },  // red
  RB:  { bg: '#16a34a', label: 'RB' },  // green
  WR:  { bg: '#2563eb', label: 'WR' },  // blue
  TE:  { bg: '#ea580c', label: 'TE' },  // orange
  K:   { bg: '#7c3aed', label: 'K'  },  // purple
  DEF: { bg: '#4b5563', label: 'DEF' }, // gray
  DL:  { bg: '#4b5563', label: 'DL' },
  LB:  { bg: '#374151', label: 'LB' },
  DB:  { bg: '#1f2937', label: 'DB' },
};

const SLOT_ELIGIBLE = {
  QB:         ['QB'],
  RB:         ['RB'],
  WR:         ['WR'],
  TE:         ['TE'],
  K:          ['K'],
  DEF:        ['DEF'],
  FLEX:       ['RB', 'WR', 'TE'],
  SUPER_FLEX: ['QB', 'RB', 'WR', 'TE'],
  WRRB_FLEX:  ['WR', 'RB'],
  REC_FLEX:   ['WR', 'TE'],
  IDP_FLEX:   ['DL', 'LB', 'DB'],
};

const SIZE = {
  sm: { fontSize: '9px',  px: '5px', height: '18px', radius: '3px' },
  md: { fontSize: '11px', px: '6px', height: '22px', radius: '4px' },
};

/** Single solid badge for standard positions */
function SingleBadge({ pos, sizeKey }) {
  const style = POSITION_STYLE[pos];
  const s = SIZE[sizeKey];
  if (!style) return null;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: style.bg,
        color: 'white',
        fontSize: s.fontSize,
        fontWeight: 700,
        padding: `0 ${s.px}`,
        height: s.height,
        borderRadius: s.radius,
        letterSpacing: '0.04em',
        lineHeight: 1,
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {style.label}
    </span>
  );
}

/** Segmented pill for flex slots — one unified container, sections side by side */
function FlexBadge({ eligible, sizeKey }) {
  const s = SIZE[sizeKey];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'stretch',
        height: s.height,
        borderRadius: s.radius,
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {eligible.map((pos, i) => {
        const style = POSITION_STYLE[pos];
        if (!style) return null;
        const isLast = i === eligible.length - 1;
        return (
          <span
            key={pos}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: style.bg,
              color: 'white',
              fontSize: s.fontSize,
              fontWeight: 700,
              padding: `0 ${s.px}`,
              lineHeight: 1,
              letterSpacing: '0.04em',
              borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.25)',
              whiteSpace: 'nowrap',
            }}
          >
            {style.label}
          </span>
        );
      })}
    </span>
  );
}

export default function PositionIcon({ slot, size = 'sm' }) {
  if (!slot) return null;

  const normalized = slot.toUpperCase();
  const eligible = SLOT_ELIGIBLE[normalized];

  if (!eligible) {
    // Unknown slot — neutral fallback
    const s = SIZE[size];
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6b7280',
          color: 'white',
          fontSize: s.fontSize,
          fontWeight: 700,
          padding: `0 ${s.px}`,
          height: s.height,
          borderRadius: s.radius,
          userSelect: 'none',
        }}
      >
        {normalized}
      </span>
    );
  }

  if (eligible.length === 1) {
    return <SingleBadge pos={eligible[0]} sizeKey={size} />;
  }

  return <FlexBadge eligible={eligible} sizeKey={size} />;
}

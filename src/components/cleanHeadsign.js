// DDOT trip headsigns sometimes carry a leading route-number prefix ("3 to Downtown")
// or a bare "to " ("to Meijer Old Redford"). Wherever we show a headsign the route is
// already displayed (badge or route page), so the prefix is redundant noise — strip it.
//
// Only strips a leading "<number> to " / "to "; plain destinations that happen to start
// with a number ("7 Mile", "8 Mile") are left alone because they aren't followed by "to".
export const cleanHeadsign = h => (h ? h.replace(/^(\d+\s+)?to\s+/i, "") : h)

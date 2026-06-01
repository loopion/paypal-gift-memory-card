import { StyleSheet } from '@react-pdf/renderer';
import type { ThemeConfig } from '../types';

export function createStyles(theme: ThemeConfig) {
  return StyleSheet.create({
    // Pages
    coverPage: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 60,
      backgroundColor: theme.colors.bg,
    },
    contentPage: {
      flexDirection: 'column',
      padding: 40,
      backgroundColor: theme.colors.bg,
    },
    summaryPage: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 60,
      backgroundColor: theme.colors.bg,
    },

    // Cover elements
    coverFrame: {
      flex: 1,
      borderWidth: 2,
      borderColor: theme.colors.cardBorder,
      borderRadius: 8,
      padding: 48,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    coverEmoji: {
      fontSize: 42,
      marginBottom: 24,
      textAlign: 'center',
      color: theme.colors.accent,
    },
    coverTitle: {
      fontFamily: theme.fontFamily,
      fontSize: 34,
      fontWeight: 700,
      color: theme.colors.accent,
      textAlign: 'center',
      letterSpacing: 1,
      marginBottom: 32,
    },
    coverDivider: {
      width: 60,
      height: 2,
      backgroundColor: theme.colors.cardBorder,
      marginBottom: 32,
    },
    coverForLabel: {
      fontFamily: theme.fontFamily,
      fontSize: 13,
      color: theme.colors.muted,
      textAlign: 'center',
      letterSpacing: 2,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    coverRecipient: {
      fontFamily: theme.fontFamily,
      fontSize: 26,
      fontWeight: 700,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 32,
    },
    coverPeriodLabel: {
      fontSize: 11,
      color: theme.colors.muted,
      textAlign: 'center',
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    coverDateRange: {
      fontFamily: theme.fontFamily,
      fontSize: 13,
      color: theme.colors.text,
      textAlign: 'center',
    },

    // Contribution card
    cardContainer: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.cardBorder,
      borderRadius: 8,
      padding: 24,
      marginBottom: 20,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    cardSenderLabel: {
      fontSize: 10,
      color: theme.colors.muted,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    cardSenderName: {
      fontFamily: theme.fontFamily,
      fontSize: 16,
      fontWeight: 700,
      color: theme.colors.accent,
    },
    cardDate: {
      fontSize: 10,
      color: theme.colors.muted,
      textAlign: 'right',
    },
    cardDivider: {
      height: 1,
      backgroundColor: theme.colors.cardBorder,
      marginBottom: 14,
    },
    cardMessage: {
      fontFamily: theme.fontFamily,
      fontSize: 13,
      color: theme.colors.text,
      lineHeight: 1.6,
    },

    // Summary page
    summaryTitle: {
      fontFamily: theme.fontFamily,
      fontSize: 36,
      fontWeight: 700,
      color: theme.colors.accent,
      textAlign: 'center',
      marginBottom: 40,
    },
    summaryCard: {
      backgroundColor: theme.colors.card,
      borderWidth: 2,
      borderColor: theme.colors.cardBorder,
      borderRadius: 8,
      padding: 32,
      alignItems: 'center',
      width: '80%',
      marginBottom: 32,
    },
    summaryStatRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    summaryStatNumber: {
      fontFamily: theme.fontFamily,
      fontSize: 32,
      fontWeight: 700,
      color: theme.colors.accent,
      marginRight: 8,
    },
    summaryStatLabel: {
      fontSize: 14,
      color: theme.colors.muted,
    },
    summaryDivider: {
      width: 40,
      height: 1,
      backgroundColor: theme.colors.cardBorder,
      marginVertical: 16,
    },
    summaryTotal: {
      fontSize: 12,
      color: theme.colors.muted,
      textAlign: 'center',
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    summaryTotalAmount: {
      fontFamily: theme.fontFamily,
      fontSize: 24,
      fontWeight: 700,
      color: theme.colors.text,
      textAlign: 'center',
    },
    summaryThankYou: {
      fontFamily: theme.fontFamily,
      fontSize: 13,
      color: theme.colors.muted,
      textAlign: 'center',
      lineHeight: 1.6,
      width: '80%',
    },

    // Page number
    pageNumber: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 9,
      color: theme.colors.muted,
    },
  });
}

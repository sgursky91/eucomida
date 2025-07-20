// home_styles.ts - criado automaticamente
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const itemSize = (screenWidth - 60) / 2;

const home_styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: itemSize,
    height: itemSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  dica: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  dicaVazia: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 4,
  },
  footerLink: {
    fontSize: 14,
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  dicaContainer: {
  maxHeight: 120, // altura máxima da rolagem
  marginBottom: 8,
},

});

export default home_styles;
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        
          <Text style={styles.title}>Home</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  hero: {
    width: 300,
    height: 300,
    marginVertical: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#889797',
    textAlign: 'center',
  },
  /** Content */
  content: {
    marginTop: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentButtons: {
    width: '100%',
    marginTop: 36,
    marginBottom: 'auto',
  },
  contentFooter: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    color: '#9fa5af',
    textAlign: 'center',
  },
  contentLink: {
    color: '#45464E',
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationColor: 'black',
    textDecorationStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: '#F82E08',
    borderColor: '#F82E08',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    borderColor: '#F82E08',
    marginTop: 12,
  },
  btnEmptyText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#F82E08',
  },
});
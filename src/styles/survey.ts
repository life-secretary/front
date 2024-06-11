import { StyleSheet } from 'react-native';
import { getFontSize } from '@/utils/font';

export const styles = StyleSheet.create({
    keyBoardAvoidingContainer: {
      width: '100%',
      flex: 1,
    },
  
    container: {
      width: '100%',
      flex: 1,
      paddingHorizontal: 24,
      backgroundColor: '#FFFFFF'
    },
  
    headerContainer: {
      marginTop: 55,
      left: -10,
    },
  
    titleContainer: {
      gap: 8,
      marginTop: 30,
    },
  
    passButtonText: {
      fontWeight: '500',
      fontSize: getFontSize(14),
      lineHeight: 17,
      color: '#40474F',
    },
  
    textContainer: {
      gap: 10,
      paddingBottom: 30,
    },
  
    titleText: {
      fontWeight: '700',
      fontSize: getFontSize(24),
      lineHeight: 29,
      color: '#000E24',
    },
  
    subTitleText: {
      fontWeight: '500',
      fontSize: getFontSize(16),
      lineHeight: 20,
      color: '#526070',
    },
  
    textInput: {
      width: '100%',
  
      fontWeight: '600',
      fontSize: getFontSize(26),
      lineHeight: 32,
      textAlign: 'center',
  
      paddingVertical: 10,
      paddingHorizontal: 44,
      borderWidth: 1.5,
      borderColor: '#F2F4F7',
      borderRadius: 10,
    },
    textInputError: {
      borderColor: '#E44848',
    },
  
    textInputBirth: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
  
      paddingVertical: 10,
      paddingHorizontal: 44,
      borderWidth: 1.5,
      borderColor: '#F2F4F7',
      borderRadius: 10,
    },
    textBirth: {
      fontWeight: '600',
      fontSize: getFontSize(26),
      lineHeight: 32,
    },
  
    buttonContainer: {
      width: '100%',
      position: 'absolute',
      left: 24,
      bottom: 50,
    },
    nextButtonText: {
      fontWeight: '600',
      fontSize: getFontSize(16),
      lineHeight: 20,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    nextButton: {
      paddingVertical: 16,
      paddingHorizontal: 106,
      borderRadius: 10,
      backgroundColor: '#0B2A4F',
    },
    nextButtonDisabled: {
      opacity: 0.3,
    },
  
    buttonSelectedText: {
      fontWeight: '700',
      fontSize: getFontSize(18),
      lineHeight: 22,
      color: '#0B2A4F',
      textAlign: 'center',
    },
    buttonSelected: {
      paddingVertical: 15,
      borderWidth: 1.5,
      borderColor: '#0B2A4F',
      borderRadius: 12,
      backgroundColor: '#E7EDF3',
    },
  
    buttonUnselectedText: {
      fontWeight: '600',
      fontSize: getFontSize(18),
      lineHeight: 22,
      color: '#A1ACB9',
      textAlign: 'center',
    },
    buttonUnselected: {
      paddingVertical: 15,
      borderRadius: 12,
      backgroundColor: '#F2F4F7',
    },
  
    subText: {
      fontWeight: '500',
      fontSize: getFontSize(14),
      lineHeight: 17,
      color: '#526070',
    },
  
    imageBirthDay: {
      width: 348,
      height: 348,
    },
    imagePersonRobot: {
      width: 388,
      height: 262,
    },
  
    welcomeText: {
      fontWeight: '600',
      fontSize: getFontSize(26),
      lineHeight: 32,
      color: '#000E24',
    },
  });
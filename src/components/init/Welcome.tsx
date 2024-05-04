import React from 'react';
import { 
    View,
    Image,
} from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { styles } from '../../screens/init/Survey';
import type { SurveyProccessProps } from '../../screens/init/Survey';

const Welcome = ({
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
    return (
        <View style={styles.container}>
            <AppHeader style={styles.headerContainer}>
                <AppIcon
                    name='back'
                    width={42}
                    height={42}
                    onPress={backButtonHandler}
                />
            </AppHeader>
            <View>
                <View style={styles.textContainer}>
                    <AppText style={styles.welcomeText}>어서오세요! 인생비서에</AppText>
                    <AppText style={styles.welcomeText}>오신것을 환영합니다</AppText>
                </View>
            </View>
            <View>
                <View style={{
                    position: 'absolute',
                    left: -10,
                    top: -30,
                }}>
                    <Image 
                        source={require('@/assets/gif/happy_birthday.gif')}
                        style={styles.imageBirthDay}
                    />
                </View>
                <View style={{
                    position: 'absolute',
                    left: '-15%',
                    top: 100,
                    zIndex: 1,
                }}>
                    <Image 
                        source={require('@/assets/gif/people_using_robots.gif')}
                        style={styles.imagePersonRobot}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    text='시작하기'
                    textStyle={styles.nextButtonText}
                    buttonStyle={styles.nextButton}
                    onPressButton={nextButtonHandler}
                />
            </View>
        </View>
    );
};

export default Welcome;
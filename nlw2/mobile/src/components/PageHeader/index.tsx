import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import styles from './styles';

interface Props {
    title: string
    headerRight?: ReactNode;
    children?: any
}

function PageHeader({ title, children, headerRight }: Props) {
    const { navigate } = useNavigation();

    function handleGoBack() {
        navigate('Landing');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} />
                </BorderlessButton>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {headerRight}
            </View>

            { children }
        </View>
    )
}

export default PageHeader;
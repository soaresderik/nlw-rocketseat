import React from 'react';
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import teachers from '../../mocks/teachers';
import styles from './styles';


function Favorites() {
    const favorites = teachers.filter(i => i.favorited)

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />
            
            <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}
            >
                {favorites.map((teacher) => <TeacherItem key={teacher.id} teacher={teacher} favorited />)}
            </ScrollView>
        </View>
    )
}

export default Favorites;
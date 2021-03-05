import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import PageHeader from '../../components/PageHeader';
import styles from './styles';
import teachers from '../../mocks/teachers';
import TeacherItem from '../../components/TeacherItem';

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={() => setIsFiltersVisible(!isFiltersVisible)}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
            
            {isFiltersVisible && (<View style={styles.searchForm}>
                <Text style={styles.label}>Matéria</Text>
                <TextInput 
                    style={styles.input}
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    placeholder="Qual a matéria?"
                    placeholderTextColor="#c1bccc"
                />

                <View style={styles.inputGroup}>
                    <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da semana</Text>
                        <TextInput 
                            style={styles.input}
                            value={weekDay}
                            onChangeText={text => setWeekDay(text)}
                            placeholder="Qual o dia?"
                            placeholderTextColor="#c1bccc"
                        />
                    </View>
                    <View style={styles.inputBlock}>
                        <Text style={styles.label}>Horário</Text>
                        <TextInput 
                            style={styles.input}
                            value={time}
                            onChangeText={text => setTime(text)}
                            placeholder="Qual o horário?"
                            placeholderTextColor="#c1bccc"
                        />
                    </View>
                </View>

                <RectButton style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Filtrar</Text>
                </RectButton>
            </View>)}
            </PageHeader>

            <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
              }}
            >
            {teachers.map((teacher) => <TeacherItem key={teacher.id} teacher={teacher} favorited={teacher.favorited} />)}

            </ScrollView>

        </View>
    )
}

export default TeacherList;
import React from "react"
import { Text, View, Image } from "react-native"
import { RectButton } from "react-native-gesture-handler"

import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';

import styles from "./styles";
import { useState } from "react";

export interface Teacher {
    id: number;
    avatar?: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp?: string;
}
  
interface Props {
    teacher:  Teacher,
    favorited: boolean
}

function TeacherItem ({ teacher, favorited }: Props){
    const [isFavorited, setIsFavorited] = useState(favorited);

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text>{teacher.cost}</Text>
                </Text>

                <View style={styles.buttonContainer}>
                    <RectButton
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}
                        ]}
                    >
                        {
                            isFavorited ? <Image source={unfavoriteIcon} /> : <Image source={heartOutlineIcon} /> 
                        }
                        
                    </RectButton>
                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar Em Contato</Text>
                    </RectButton>
                </View>
            </View>   
        </View>
    )
}

export default TeacherItem;


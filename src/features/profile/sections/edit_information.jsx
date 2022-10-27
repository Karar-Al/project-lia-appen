import { useState } from 'react'
import Title from '../components/title';
import Wrapper from '../components/wrapper';
import InputField, { InputLabel } from '../../../components/input-field';
import PrimaryButton from '../../../components/buttons/index';
import TextArea from '../components/textArea';
import { Mail, Phone, GraduationCap, Star, Puzzle, Calendar } from 'lucide-react';
import InputButton from '../components/input-button';
import { putUser } from '../api/putUser';

const EditInformation = ({ userData }) => {

    const [sendData, setSendData] = useState({
        id: 1,
        phone: '',
        school: '',
        email: '',
        bio: '',
        badges: [],
        periodStart: '',
        periodEnd: '',
        profession: '',
        location: '',
        work_type: ''
    });

    const handleSave = (e) => {

        const data = {
            id: 1,
            phone: (sendData.phone !== '') ? sendData.phone : userData.data.phone,
            school: (sendData.school !== '') ? sendData.school : userData.attributes.school,
            email: (sendData.email !== '') ? sendData.email : userData.data.email,
            work_type: (sendData.work_type !== '') ? sendData.work_type : userData.attribute.work_type,
            bio: (sendData.bio !== '') ? sendData.bio : userData.data.bio,
            location: (sendData.location !== '') ? sendData.location : userData.attributes.location,
            profession: (sendData.profession !== '') ? sendData.profession : userData.attributes.profession,
            badges: (sendData.badges.length > 0) ? [sendData.badges] : userData.attributes.badges,
            period: (sendData.periodStart !== '' && sendData.periodEnd !== '') ? [sendData.periodStart, sendData.periodEnd] : userData.attributes.period
        }

        console.log(data)
        //putUser(data)
    }

    const handleCheckbox = (e) => {
        if(e.target.checked){
            setSendData(state => ({
                ...state,
                work_type: [
                    ...state.work_type,
                    e.target.value
                ]
            }))
        }else{
            setSendData(state => ({...state, work_type: state.work_type.filter(item => e.target.value !== item)}))
        }

        console.log(sendData.work_type)
        
    }

    return (
        <>
            <Wrapper 
                direction='column' 
                gap={[3]}
                padding={[5, 1, 0, 1]}>

                <Title size={[1.5]} >{`${userData.attributes.type === 'student' ? 'Om dig' : 'Om företaget'}`}</Title>

                <InputField 
                    onChange={(e) => setSendData(state => ({...state, phone: e.target.value }))}
                    icon={<Phone strokeWidth={1} />}
                    type="tel"
                    placeholder='Telefonnummer'/>
    
                <InputField
                    onChange={(e) => setSendData(state => ({ ...state, email: e.target.value }))}
                    icon={<Mail strokeWidth={1} />}
                    type="email"
                    placeholder='E-post' />

                <InputField 
                    onChange={(e) => setSendData(state => ({ ...state, school: e.target.value }))}
                    icon={<GraduationCap strokeWidth={1} />}
                    type="text"
                    placeholder='Skola / Utbildning'/>

                <InputField
                    onChange={(e) => setSendData(state => ({ ...state, location: e.target.value }))}
                    icon={<GraduationCap strokeWidth={1} />}
                    type="text"
                    placeholder='Vilken stad befinner du dig inom?' />

                <InputField
                    onChange={(e) => setSendData(state => ({ ...state, profession: e.target.value }))}
                    icon={<GraduationCap strokeWidth={1} />}
                    type="text"
                    placeholder='Din yrkesinriktning?' />

                <InputField 
                    onChange={(e) => setSendData(state => ({ ...state, badges: [...state.badges, e.target.value]}))}
                    icon={<Star strokeWidth={1} />}
                    type='text'
                    placeholder='Kompentenser'/>

                <TextArea onChange={(e) => setSendData(state => ({ ...state, bio: e.target.value }))}>{`Kort beskrivning om ${userData.attributes.type === 'student' ? 'dig själv' : 'företaget'}`}</TextArea>

            </Wrapper>

            {userData.attributes.type === 'company' ||
            
                <Wrapper
                    direction='column'
                    gap={[3]}
                    padding={[7, 1, 7, 1]}>

                    <Title size={[1.5]} >Önskemål LIA</Title>

                    <InputLabel>Datum period från</InputLabel>
                    <InputField
                        onChange={(e) => setSendData(state => ({ ...state, periodStart: e.target.value }))}
                        icon={<Calendar strokeWidth={1} />}
                        type="date" />

                    <InputLabel>Datum period till</InputLabel>
                    <InputField
                        onChange={(e) => setSendData(state => ({ ...state, periodEnd: e.target.value }))}
                        icon={<Calendar strokeWidth={1} />}
                        type="date" />

                    <Wrapper
                        direction='column'
                        gap={[1]}>

                        <Wrapper
                            gap={[1]}
                            styleDirection='center'>

                            <InputButton
                                id={1}
                                name='work_type'
                                type='checkbox'
                                value='Remote'
                                label='Remote'
                                onClick={handleCheckbox}
                            />

                            <InputButton
                                id={2}
                                name='work_type'
                                type='checkbox'
                                value='På plats'
                                label='På plats'
                                onClick={handleCheckbox}
                            />

                            <InputButton
                                id={3}
                                name='work_type'
                                type='checkbox'
                                value='Hybrid'
                                label='Hyrbrid'
                                onClick={handleCheckbox}
                            />

                        </Wrapper>
                    </Wrapper>

                </Wrapper>
            } 
            

            <Wrapper 
                styleDirection='center' 
                padding={[0, 0, 5, 0]}
                gap={[1]}>

                <PrimaryButton onClick={handleSave}>Spara</PrimaryButton>

            </Wrapper>
        </>
    )
}

export default EditInformation
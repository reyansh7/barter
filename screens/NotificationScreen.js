import * as React from 'react'
import {Text,View,StyleSheet,FlatList} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import {ListItem,Icon} from 'react-native-elements'
import {MyHeader} from '../components/MyHeader'

export default class NotificationScreen extends React.Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
    }
    getNotifications=()=>{
        this.requestRef=db.collection('all_notifications')
        .where('notification_status','==','unread')
        .where('targeted_user_id','==',this.state.userId)
        .onSnapshot(snapshot=>{
            var allNotifications=[]
            snapshot.docs.map(doc=>{
                var notification=doc.data()
                notification['doc_id']=doc.id
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications:allNotifications,
            })
        })
    }

    componentDidMount(){
        this.getNotifications()
    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({item,index}) =>
    { return ( <ListItem key={index} 
        leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>} 
        title={item.item_name} 
        titleStyle={{ color: 'black', fontWeight: 'bold' }} 
        subtitle={item.message} bottomDivider /> ) }


    render(){
        return(
            <View>
                <View style={{flex:0.1}}> 
                <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
                 </View> 
                 <View style={{flex:0.9}}> { this.state.allNotifications.length === 0 ?( <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                 <Text style={{fontSize:25}}>You have no notifications</Text>
                 </View> ) :( <FlatList keyExtractor={this.keyExtractor} data={this.state.allNotifications} renderItem={this.renderItem} /> ) }
                 </View>


            </View>
        )
    }
}
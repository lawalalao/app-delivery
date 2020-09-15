import React, { Component } from 'react';
import { Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
var {height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper'

export default class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      dataBanner:[],
      dataCategories[],
      selectCatg:0
    }
  }

  componentDidMount(){
    const url = "http://tutofox.com/foodapp/api.json"
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataBanner: responseJson.banner,
        dataCategories: responseJson.categories
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1,backgroundColor:"#f2f2f2" }}>
          <View style={{width: width, alignItems:'center'}} >
              <Image style={{height:60,width:width/2,margin:10 }} resizeMode="contain" source={require("./image/foodapp.png")}  />
              <Swiper style={{height:width/2}}  showsButtons={false} autoplay={true} autoplayTimeout={2}>
                {
                  this.state.dataBanner.map((itembann)=>{
                    return(
                      <Image style={styles.imageBanner} resizeMode="contain" source={{uri:itembann}}/>
                    )
                  })
                }
              </Swiper>
              <View style={{height:20}} />
              </View>
              <View style={{width:width, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>  
              <Text style={style.titleCatg}>Categories {this.state.selectCatg}</Text>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
              <FlatList
              horizontal={true}
              data={this.state.dataCategories}
              renderItem={({item})=>this._renderItem(item)}
              keyExtractor ={(item,index)=>index.toSrting()}
              />
              <Text>App delivery</Text>
              <Text>{JSON.stringify(this.state.dataCategories)}</Text>
              <View style={{height:20}} />
              </View>
            </View>
      </ScrollView>
              );
            }

            _renderItem(item){
                return(
                     <TouchableOpacity style={[styles.divCategorie,{backgroundColor:item.color}]}
      onPress={()=>this.setState({selectCatg:item.id})}>
        <Image
          style={{width:100,height:80}}
          resizeMode="contain"
          source={{uri : item.image}} />
        <Text style={{fontWeight:'bold',fontSize:22}}>{item.name}</Text>
      </TouchableOpacity>
                )
            }
 
    )
  }

}

const styles = StyleSheet.create({
  imageBanner: {
    height:width/2,
    width:width-40,
    borderRadius:10,
    marginHorizontal:20
  },
  divCategorie:{
    backgroundColor:'red',
    margin:5, alignItems:'center',
    borderRadius:10,
    padding:10
  },
  titleCatg:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  } 
});
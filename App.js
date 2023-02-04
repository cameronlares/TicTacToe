import React, { useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ImageBackground, Pressable,Alert } from 'react-native'
import bg from './assets/bg.jpeg'
export default function App() {
  const [map, setMap] = useState([
    ['o', '', ''], // 1st row
    ['', '', 'x'], // 2nd row
    ['', '', 'x'] // 3rd row
  ])
const onPress = ( rowIndex,columnIndex ) => {
console.warn("Row", rowIndex,"Column", columnIndex );

if(map[rowIndex][columnIndex] !=""){
  Alert.alert("Position already occupied");
  return;
}

//Expects a new object or a function be called with an existing state,
// returns updated info

// useEffect ( () => {
//   setMap((existingMap) => { 
//     existingMap[rowIndex][columnIndex] = "x";
//   return existingMap;
//   });
// },[map]) 

setMap((existingMap) => { 
  const updatedMap = [...existingMap]
  updatedMap[rowIndex][columnIndex] = "x";
return updatedMap;
});

};
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode='cover'>
        <View style={styles.map}>
          {map.map( (row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable key={columnIndex} onPress={()=> onPress(rowIndex,columnIndex)} style={styles.cell}>
                  {cell == 'o' && <View style={styles.circle} />}
                  {cell == 'x' &&
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View style={[styles.crossLine, styles.crossLineReversed]} />
                    </View>
                  }
                </Pressable>
              ))}
            </View>
          ))}

          {/* <View style={styles.circle} />
          <View style={styles.cross}>
            <View style={styles.crossLine} />
            <View style={[styles.crossLine, styles.crossLineReversed]} />
          </View> 
          
          */}
        </View>
      </ImageBackground>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242D34'
  },
  bg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  map: {
    borderWidth: 1,
    borderColor: 'white',
    width: '80%',
    aspectRatio: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row'
    // borderColor: 'red',
    // borderWidth: 2,
  },
  cell: {
    width: 100,
    height: 100,
    flex: 1,

    borderColor: 'white',
    borderWidth: 1
  },
  circle: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

    borderWidth: 10,
    borderColor: 'white'
  },
  cross: {
 flex:1,
  },
  crossLine: {
    // position: 'relative',
    left: '48%',
    width: 10,
    height: '100%',
    backgroundColor: 'white',
    // Used Border Radius no BG color to create donut circle
    position: 'absolute',
    borderRadius: 5,
    transform: [
      {
        rotate: '45deg'
      }
    ]
  },
  crossLineReversed: {
    transform: [
      {
        rotate: '-45deg'
      }
    ]
  }
})

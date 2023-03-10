import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert
} from 'react-native'
import bg from './assets/bg.jpeg'

export default function App() {
  const [map, setMap] = useState([
    ['', '', ''], // 1st row
    ['', '', ''], // 2nd row
    ['', '', ''] // 3rd row
  ])

  const [currentTurn, setCurrentTurn] = useState('x')

  const onPress = (rowIndex, columnIndex) => {
    console.warn('Row', rowIndex, 'Column', columnIndex)
    if (map[rowIndex][columnIndex] != '') {
      Alert.alert('Position already occupied')
      return
    }

    //Expects a new object or a function be called with an existing state,
    // returns updated info

      setMap((existingMap) => {
      const updatedMap = [...existingMap]
      updatedMap[rowIndex][columnIndex] = currentTurn
      return updatedMap
    })

    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x')
    checkWinningState()
  }

  const checkWinningState = (state) => {
    //Check Row

    for (let i = 0; i < 3; i++) {
      const isRowXWinning = map[i].every((cell) => cell === 'x')
      const isRowOWinning = map[i].every((cell) => cell === 'o')
      //Alerts second argument supposed to be a string so use temporals
      if (isRowXWinning) {
        Alert.alert(`X won. Row:, ${i}`)
      }

      if (isRowOWinning) {
        Alert.alert(`'O won. Row: ${i}`)
      }
    }

    //Check Column
    for (let col = 0; col < 3; col++) {
      let isColumnXWinner = true
      let isColumnOWinner = true
      for (let row = 0; row < 3; row++) {
        if (map[row][col] !== 'x') {
          isColumnXWinner = false
          console.log(isColumnXWinner)
        }
        if (map[row][col] !== 'o') {
          isColumnOWinner = false
          console.log(isColumnOWinner)
        }
      }

      if (isColumnXWinner) {
        Alert.alert(`X won. Col:${col}`)
        break
      }

      if (isColumnOWinner) {
        Alert.alert(`O won. Col:,${col}`)
        break
      }
    }

    //Check Diagonals

    let isDiagonal1OWinning = true
    let isDiagonal1XWinning = true

    let isDiagonal2OWinning = true
    let isDiagonal2XWinning = true

    for (let i = 0; i < 3; i++) {
      if (map[i][i] != 'o') {
        isDiagonal1OWinning = false
      }

      if (map[i][i] != 'x') {
        isDiagonal1XWinning = false
      }

      if (map[i][i] != 'o') {
        isDiagonal1OWinning = false
      }

      if (map[i][i] != 'x') {
        isDiagonal1XWinning = false
      }
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode='cover'>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable
                  key={`row-${rowIndex}-col-${columnIndex}`}
                  onPress={() => onPress(rowIndex, columnIndex)}
                  style={styles.cell}
                >
                  {cell == 'o' && <View style={styles.circle} />}
                  {cell == 'x' && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View
                        style={[styles.crossLine, styles.crossLineReversed]}
                      />
                    </View>
                  )}
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
    flex: 1
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
    flex: 1
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

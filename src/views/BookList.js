import React, { Component } from 'react'
import NYTimesService from '../services/NYTimesService'
import BookItem from '../components/BookItem'

import {
  View,
  ListView,
  StyleSheet,
  Text
} from 'react-native'

export default class BookList extends Component<{}> {
  constructor () {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount () {
    let nyTimes = new NYTimesService()
    return nyTimes.invokeApi(this.state)
      .then((json) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json)
        })
      })
  }

  _renderRow (rowData) {
    return <BookItem coverURL={rowData.book_image}
      title={rowData.title}
      author={rowData.author} />
  }

  _renderHeader () {
    return (<View style={styles.sectionDivider}>
      <Text style={styles.headingText}>
            Bestsellers in  Hardcover Fiction
        </Text>
    </View>)
  }

  _renderFooter () {
    return (
      <View style={styles.sectionDivider}>
        <Text>Data  from  the New York  Times Best  Seller  list.</Text>
      </View>
    )
  }

  render () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 24
  },
  list: {
    flex: 1,
    flexDirection: 'row'
  },
  listContent: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  sectionDivider: {
    padding: 8,
    backgroundColor: '#EEEEEE',
    alignItems: 'center'
  },
  headingText: {
    flex: 1,
    fontSize: 24,
    alignSelf: 'center'
  }
})

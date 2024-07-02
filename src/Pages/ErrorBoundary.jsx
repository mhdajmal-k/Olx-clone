import React, { Component } from 'react'

export default class ErrorBoundary extends Component {

    constructor(props){
        super(props)
            this.state={
                hasError:false
    }

}
static getDerivedStateFromError(error){
    return{
        hasError:true
    }
}
componentDidCatch(error,info){
    console.log(error)
    console.log(info)
}
  render() {
   if(this.state.hasError){
    return <h1 style={{textAlign:"center"}}>Something went Wrong ...</h1>
   }
   return this.props.children
  }
}

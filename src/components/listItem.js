import React from "react";

class listItem extends React.Component {
    render(){
        return (
        <div className="listItem">
            <div className="itemHeader">{this.props.header}</div>
            <div className="itemDate">{this.props.date}</div>
        </div>
        )
    }
}
export default listItem;
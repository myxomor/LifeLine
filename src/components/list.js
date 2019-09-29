import React from "react";
import ListItem from "./listItem";



class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personInfo: this.props.personInfo
        }
    }
    itemRenderer (list) {
        return list.map(
            item =>(
            <ListItem
            header={item.header}
            date={item.date}
            ok={item.ok}
        />)
        );
    }

    render() {
        return(
            <div>
                {this.itemRenderer(this.state.personInfo.goals)}
            </div>
        );
    }
}
export default List;
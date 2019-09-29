import React from "react";
import ListItem from "./listItem";

var goals = [
    {
        header: "1234125423",
        date: "11.01.1009"
    },
    {
        header: "trtrrtd",
        date: "11.01.1009"
    }
];
goals.header = "pizda";

class List extends React.Component {
    itemRenderer (list) {
        return list.map(
            item =>(
            <ListItem
            header={item.header}
            date={item.date}
        />)
        );
    }

    render() {
        return(
            <div>
                {this.itemRenderer(goals)}
            </div>
        );
    }
}
export default List;
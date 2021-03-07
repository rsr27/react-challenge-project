import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

const DEL_ORDER_URL = `${SERVER_IP}/api/delete-order`
const EDT_ORDER_URL = `${SERVER_IP}/api/edit-order`

class ViewOrders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }
	
    menuItemChosen(event, order) {
		
		// make a separate copy of the array
		var array = [...this.state.orders]; 
		
		// Find and update the object
		for (var i = 0; i < array.length; i++) {
			if (array[i]._id === order._id) {
				array[i].order_item = event.target.value;
				this.setState({orders: array});
				break;
			};
		}
    }

    menuQuantityChosen(event, order) {
		
		// make a separate copy of the array
		var array = [...this.state.orders]; 
		
		// Find and update the object
		for (var i = 0; i < array.length; i++) {
			if (array[i]._id === order._id) {
				array[i].quantity = event.target.value;
				this.setState({orders: array});
				break;
			};
		}
    }
	
	editOrder(event, order) {
        event.preventDefault();
        if (order.order_item === "") return;
		
		if (!window.confirm('Are you sure you want to update this order?'))
			return;
		
        fetch(EDT_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: order._id,
                order_item: order.order_item,
                quantity: order.quantity,
                ordered_by: order.ordered_by,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
	};
	
    deleteOrder(event, order) {
        event.preventDefault();
        if (order.order_item === "") return;
		
		if (!window.confirm('Are you sure you want to delete this order?'))
			return;
		
        fetch(DEL_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: order._id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
			console.log("Success", JSON.stringify(response)); 
			
			// Now update the list again:
			var array = [...this.state.orders]; // make a separate copy of the array
			
			// Find and remove the object
			for (var i = 0; i < array.length; i++) {
				if (array[i]._id === order._id) {
					array.splice(i, 1);
					this.setState({orders: array});
					break;
				};
			}
		})
        .catch(error => console.error(error));
		
    }
	
    render() {
        return (
            <Template>
                <div className="container-fluid">
				<form>
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">                             
									<select 
											value={order.order_item}
											onChange={(event) => this.menuItemChosen(event, order)}
											className="menu-select"
									>
									<option value="Soup of the Day">Soup of the Day</option>
									<option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
									<option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
									<option value="Chili Con Carne">Chili Con Carne</option>
								</select>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: 
										<select value={order.quantity} onChange={(event) => this.menuQuantityChosen(event, order)}>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
										</select>
									</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success" onClick={(event) => this.editOrder(event, order)}>Edit</button>
                                     <button className="btn btn-danger" onClick={(event) => this.deleteOrder(event, order)}>Delete</button>
                                 </div>
                            </div>
                        );
                    })}
				</form>
                </div>
            </Template>
        );
    }
}

/*
				<div className="form-wrapper">
                    <form>
                        <label className="form-label">I'd like to order...</label><br />
                        <select 
                            value={this.state.order_item}
                            className="menu-select"
                        >
                            <option value="" defaultValue disabled hidden>Lunch menu</option>
                            <option value="Soup of the Day">Soup of the Day</option>
                            <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                            <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                            <option value="Chili Con Carne">Chili Con Carne</option>
                        </select><br />
                        <label className="qty-label">Qty:</label>
                        <select value={this.state.quantity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <button type="button" className="order-btn">Order It!</button>
                    </form>
                </div>
				*/

export default ViewOrders;

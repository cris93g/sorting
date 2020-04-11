import React, { Component } from 'react';
import { getMergeSortAnimations } from '../algorithm/MergeSort';
import './SortingVisualizer.css';
const ANIMATION_SPEED = 1;
const Number_ARRAYS = 310;
const PRIMARY_COLOR = 'blue';
const SECONDARY_COLOR = 'red';

class SortingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			Number_array: 0
		};
		this.addArrays = this.addArrays.bind(this);
	}
	componentDidMount() {
		this.resetArray();
	}
	addArrays(e) {
		const array = [];
		let str = e.target.value.replace(/\s+/g, ' ').trim();
		console.log(str);
		let welp = str.split(' ');
		for (let i = 0; i < welp.length; i++) {
			console.log(typeof welp[i]);
			array.push(parseInt(welp[i]));
		}
		this.setState({ array });
	}
	resetArray() {
		const array = [];
		for (let i = 0; i < Number_ARRAYS; i++) {
			array.push(randomIntFromInterval(5, 730));
		}
		this.setState({ array });
	}
	mergeSort() {
		const animations = getMergeSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			console.log(animations[i]);
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [ barOneIdx, barTwoIdx ] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED);
			} else {
				setTimeout(() => {
					const [ barOneIdx, newHeight ] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED);
			}
		}
	}
	render() {
		const { array } = this.state;
		console.log(array);
		return (
			<div className="array-container" style={{ textAlign: 'center', marginTop: '5%' }}>
				{array ? (
					array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								backgroundColor: PRIMARY_COLOR,
								height: `${value}px`
							}}
						/>
					))
				) : (
					''
				)}
				<br />
				<input onChange={(e) => this.addArrays(e)} />
				<button onClick={() => this.resetArray()}>Generate New Array</button>
				<button onClick={() => this.mergeSort()}>Merge Sort</button>
			</div>
		);
	}
}

export default SortingVisualizer;

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
	if (arrayOne.length !== arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] !== arrayTwo[i]) {
			return false;
		}
	}
	return true;
}

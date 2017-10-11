export function sp(n) {
	var a=new Array;
	a=n.split('');
	/*console.log(n)
	console.log(a)*/
	return a;
}

export function cust(a){




	this.$router.push(a)
}
export function goods(){
	this.$router.push('orderHome')
}
export function approval(){
	this.$router.push('newActivityList')
}
export function mine(){
	this.$router.push('my')
}






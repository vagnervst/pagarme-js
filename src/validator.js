var isArray = function(a) {
	return Object.prototype.toString.call(a) === '[object Array]';
};

var isNumeric = function(n) {
	return !isArray(n) && (n - parseFloat(n) + 1) >= 0;
};

PagarMe.Validator = {
	getCardBrand: function(cardNumber) {
		if(!cardNumber) {
			return null;
		}

		cardNumber = cardNumber.replace(/[^0-9]/g, '');

		var cardStartRules = {
			'elo': ['636368', '438935', '504175', '451416', '636297', '5067', '4576', '4011'],
			'discover': ['6011', '622', '64', '65'],
			'diners': ['301', '305', '36', '38'],
			'amex': ['34', '37'],
			'aura': ['50'],
			'jcb': ['35'],
			'hipercard': ['38', '60'],
			'visa': ['4'],
			'mastercard': ['5']
		};

		var matchBrand;
		var matchLength = 0;

		for(var brand in cardStartRules) {
			for(var i = 0; i < cardStartRules[brand].length; i++) {
				var start = cardStartRules[brand][i];
				var comp1, comp2;

				if (start.length > cardNumber.length) {
					comp1 = cardNumber;
					comp2 = start.substring(0, cardNumber.length);
				} else {
					comp1 = cardNumber.substring(0, start.length);
					comp2 = start;
				}

				if(comp1 == comp2 && start.length > matchLength) {
					matchBrand = brand;
					matchLength = start.length;
				}
			}
		}

		if (matchBrand) {
			if (matchLength <= cardNumber.length) {
				return matchBrand;
			} else {
				return 'unknown';
			}
		} else {
			return 'unknown';
		}
	},
	isValidCardNumber: function(cardNumber) {
		if (!cardNumber) {
			return false;
		}

		cardNumber = cardNumber.replace(/[^0-9]/g, '');

		var luhnDigit = parseInt(cardNumber.substring(cardNumber.length-1, cardNumber.length));
		var luhnLess = cardNumber.substring(0, cardNumber.length-1);

		var sum = 0;

		for (i = 0; i < luhnLess.length; i++) {
			sum += parseInt(luhnLess.substring(i, i+1));
		}

		var delta = new Array (0,1,2,3,4,-4,-3,-2,-1,0);

		for (i = luhnLess.length - 1; i >= 0; i -= 2) {
			var deltaIndex = parseInt(luhnLess.substring(i, i+1));
			var deltaValue = delta[deltaIndex];
			sum += deltaValue;
		}

		var mod10 = sum % 10;
		mod10 = 10 - mod10;

		if (mod10 == 10) {
			mod10 = 0;
		}

		return (mod10 == parseInt(luhnDigit));
	},
	isValidExpirationMonth: function(expirationMonth) {
		if (!expirationMonth) {
			return false;
		}

		if (!isNumeric(expirationMonth)) {
			return false;
		}

		expirationMonth = parseInt(expirationMonth);

		if (expirationMonth <= 0 || expirationMonth > 12) {
			return false;
		}

		return true;
	},
	isValidExpirationYear: function(expirationYear) {
		if (!expirationYear) {
			return false;
		}

		if (!isNumeric(expirationYear)) {
			return false;
		}

		expirationYear = expirationYear.toString();

		if (expirationYear.length !== 2 && expirationYear.length !== 4) {
			return false;
		}

		return true;
	},
	isValidExpirationDate: function(cardDate) {
		cardDate = cardDate.replace('/', '');

		if (cardDate.length != 4) {
			return false;
		}

		var month = cardDate.substring(0, 2);
		var year = cardDate.substring(2, 4);
		var nowdate = new Date();
		var nowyear = nowdate.getFullYear()%1000;
		var nowmonth = nowdate.getMonth() + 1;

		if (!isNumeric(month) || !isNumeric(year)) {
			return false;
		}

		if  (year < nowyear || (year == nowyear && month < nowmonth)) {
			return false;
		}

		month = parseInt(month);
		return month <= 12 && month > 0;
	},
	isValidCvv: function(cvv, brand) {
		if (!cvv || !isNumeric(cvv)) {
			return false;
		}

		if (brand == 'amex' && cvv.length != 4) {
			return false;
		} else if (brand != 'amex' && cvv.length != 3) {
			return false;
		}

		return true;
	},
	isValidEmail: function(email) {
		var filter = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return filter.test(email);
	},
	isValidCpf: function(cpfNumber) {
		cpfNumber = cpfNumber.replace(/[^0-9]+/g, '');

		if (cpfNumber.length != 11) {
			return false;
		}

		var sum = 0;
		var div;

		for (var i = 0; i < 9; i++) {
			sum += parseInt(cpfNumber.charAt(i)) * (10 - i); 
		}

		div = (sum % 11 < 2) ? 0 : 11 - (sum % 11);

		if (div != parseInt(cpfNumber.charAt(9))) {
			return false;
		}

		sum = 0;

		for (var i = 0; i < 10; i++) {
			sum += parseInt(cpfNumber.charAt(i)) * (11 - i);
		}

		div = (sum % 11 < 2) ? 0 : 11 - (sum % 11);

		if (div != parseInt(cpfNumber.charAt(10))) {
			return false;
		}

		return true;
	},
	isValidCnpj: function(cnpjNumber) {
		cnpjNumber = cnpjNumber.replace(/[^0-9]+/g, '');

		if (cnpjNumber.length != 14) {
			return false;
		}

		var sum = 0;
		var div;
		var coef = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

		for (var i = 0; i < 12; i++) {
			sum += parseInt(cnpjNumber.charAt(i)) * coef[i];
		}

		div = (sum % 11 < 2) ? 0 : 11 - (sum % 11);

		if (div != parseInt(cnpjNumber.charAt(12))) {
			return false;
		}

		sum = 0;
		coef.unshift(6);

		for (var i = 0; i < 13; i++) {
			sum += parseInt(cnpjNumber.charAt(i)) * coef[i];
		}

		div = (sum % 11 < 2) ? 0 : 11 - (sum %11);

		if (div != parseInt(cnpjNumber.charAt(13))) {
			return false;
		}

		return true;
	},
	isValidDDD: function(ddd) {
		return isNumeric(ddd) && ddd.length == 2;
	},
	isValidPhoneNumber: function(number) {
		number = number.replace(/[^0-9]+/g, '');

		if (number.length != 8 && number.length != 9) {
			return false;
		}

		return true;
	},
	isValidZipCode: function(zipcode) {
		zipcode = zipcode.replace(/[^0-9]+/g, '');

		return zipcode.length == 8;
	}
};

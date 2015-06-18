var PagarMe = PagarMe || {};

(function(PagarMe, global) {

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

		var cardStartRules = [
			['elo', ['627780', '636548', '636117', '637095', '639350', '627893', '636368', '438935', '504175', '451416', '636297', '5067', '4576', '4011']],
			['discover', ['6011', '622', '64', '65']],
			['hipercard', ['384100', '384140', '384160', '60']],
			['diners', ['301', '305', '36', '38']],
			['amex', ['34', '37']],
			['aura', ['50']],
			['jcb', ['35']],
			['visa', ['4']],
			['mastercard', ['5']]
		];

		for (var i = 0; i < cardStartRules.length; i++) {
			var cardStartRule = cardStartRules[i][1];
			for (var j = 0; j < cardStartRule.length; j++) {
				var start = cardStartRule[j];
				if (cardNumber.substring(0, start.length) == start) {
					return cardStartRules[i][0];
				}
			}
		}

		return "unknown";
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

// Helpers
var ieVersion = function () {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");

	if ( msie > 0 )      // If Internet Explorer, return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
	else                 // If another browser, return 0
		return 0;
};

var objectSize = function(obj) {
	var objectSize = 0;
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			objectSize++;
		}
	}
	return objectSize;
};

var jsonpRequest = function (url, callback) {
	var now = new Date();
	var functionName = 'pagarme_jsonp_' + now.getTime();

	global[functionName] = function(json) {
		if (json.status == 200) {
			callback(json.body);
		}

		try {
			delete global[functionName];
		} catch(e) {
			global[functionName] = undefined;
		}
	};

	if (url.indexOf('?') > -1) {
		url += '&callback=' + functionName;
	} else {
		url += '?callback=' + functionName;
	}

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	document.getElementsByTagName('head')[0].appendChild(script);
};

var ajaxRequest = function (url, callback) {
	var httpRequest,
	xmlDoc;

	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	} else {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}

	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState != 4) {
			return;
		}

		if (httpRequest.status != 200 && httpRequest.status != 304) {
			return;
		}
		callback(JSON.parse(httpRequest.responseText));
	};

	httpRequest.open("GET", url, true);
	httpRequest.send(null);
};

var request = function(params, callback) {
	var ie = ieVersion();
	var baseUrl = 'https://api.pagar.me/1';

	params.query = params.query || {};

	if (ie && ie <= 9) {
		var queryParams = {};

		for (var key in params.query) {
			queryParams['query[' + key + ']'] = params.query[key];
		}

		queryParams.method = 'get';
		queryParams.path = encodeURIComponent(params.path);

		var url = baseUrl + '/jsonp' + queryString(queryParams);
		jsonpRequest(url, callback);
	} else {
		var url = baseUrl + params.path + queryString(params.query);
		ajaxRequest(url, callback);
	}
};

var queryString = function(obj) {
	if (!obj || !objectSize(obj)) {
		return '';
	}

	return '?' + paramsAsString(obj);
};

var paramsAsString = function(obj) {
	var parametersArray = [];
	for(var key in obj) {
		// Values should be on UTF-8
		parametersArray.push(key + "=" + unescape(encodeURIComponent(obj[key])));
	}

	return parametersArray.join("&");
};


// Credit card

PagarMe.CreditCard = function PagarMeCreditCard() {
	this.cardNumber = null;
	this.cardHolderName = null;
	this.cardExpirationMonth = null;
	this.cardExpirationYear = null;
	this.cardCVV = null;
};

PagarMe.CreditCard.prototype.brand = function() {
	if(!this.cardNumber) {
		return null;
	}

	var cardNumber = this.cardNumber.replace(/[^0-9]/g, '');

	var cardStartRules = [
		['elo', ['636368', '438935', '504175', '451416', '636297', '5067', '4576', '4011']],
		['discover', ['6011', '622', '64', '65']],
		['diners', ['301', '305', '36', '38']],
		['amex', ['34', '37']],
		['aura', ['50']],
		['jcb', ['35']],
		['hipercard', ['38', '60']],
		['visa', ['4']],
		['mastercard', ['5']]
	];

	for (var i = 0; i < cardStartRules.length; i++) {
		var cardStartRule = cardStartRules[i][1];
		for (var j = 0; j < cardStartRule.length; j++) {
			var start = cardStartRule[j];
			if (cardNumber.substring(0, start.length) == start) {
				return cardStartRules[i][0];
			}
		}
	}

	return 'unknown';
};

PagarMe.CreditCard.prototype.fieldErrors = function() {
	var errors = {};

	if (!PagarMe.Validator.isValidCardNumber(this.cardNumber)) {
		errors['card_number'] = 'Número do cartão inválido.';
	}

	if (!this.cardHolderName || this.cardHolderName.length == 0 || !isNaN(this.cardHolderName)) {
		errors['card_holder_name'] = 'Nome do portador inválido.';
	}

	if (!PagarMe.Validator.isValidExpirationMonth(this.cardExpirationMonth)) {
		errors['card_expiration_month'] = 'Mês de expiração inválido.';
	}

	if (!PagarMe.Validator.isValidExpirationYear(this.cardExpirationYear)) {
		errors['card_expiration_year'] = 'Ano de expiração inválido.';
	}

	if (!PagarMe.Validator.isValidCvv(this.cardCVV, this.brand())) {
		errors['card_cvv'] = 'Código de segurança inválido.';
	}

	return errors;
};

PagarMe.CreditCard.prototype.stringifyParameters_ = function() {
	var encryptionHash = {
		'card_number': this.cardNumber,
		'card_holder_name': this.cardHolderName,
		'card_expiration_date': "" + (this.cardExpirationMonth.length == 1 ? "0" : "") + this.cardExpirationMonth + ((this.cardExpirationYear.length > 2) ? this.cardExpirationYear.substr(-2) : this.cardExpirationYear),
		'card_cvv': this.cardCVV
	};

	if(PagarMe.sessionId) {
		encryptionHash['session_id'] = PagarMe.sessionId;
	}

	var parametersArray = [];
	for(var key in encryptionHash) {
		// Values should be on UTF-8
		parametersArray.push(key + "=" + unescape(encodeURIComponent(encryptionHash[key])));
	}

	return parametersArray.join("&");
};

PagarMe.CreditCard.prototype.generateHash = function(callback) {
	if (!PagarMe.encryption_key) {
		alert('Erro: Você não configurou sua encryption_key. Por favor, sete a chave em PagarMe.encryption_key. Para mais informações, visite: https://pagar.me/docs/restful-api/card-hash/');
		return;
	}

	if (PagarMe.encryption_key.substring(0, 2) == "ak") {
		alert("Erro: Você está usando a api_key ao invés da encryption_key. Por favor, verifique se a chave inserida é a encryption_key disponível em seu dashboard. Para mais informações, visite: https://pagar.me/docs/restful-api/card-hash/");
		return;
	}

	var stringifiedParameters = this.stringifyParameters_();

	request({
		path: '/transactions/card_hash_key',
		query: {
			encryption_key: encodeURIComponent(PagarMe.encryption_key)
		}
	}, function(data) {
		var crypt = new JSEncrypt();
		crypt.setPublicKey(data['public_key']);
		var encryptedString = data.id + "_" + crypt.encrypt(stringifiedParameters);

		callback(encryptedString);
	});
};

PagarMe.creditCard = PagarMe.CreditCard;
PagarMe.creditCard.prototype = PagarMe.CreditCard.prototype;

})(PagarMe, window);

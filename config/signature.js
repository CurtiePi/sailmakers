
const glyph = '~~_/)~~';
const name = '<p style="font-family: Ariel; color: #436663; font-size: 2em">David Martin</p>';
const email = '<a href="mailto:dave@uksailmakers-ne.com">dave@uksailmakers-ne.com</a>';
const phone = '646-48305898';
const site = '<a href="www.uksailmakers-ne.com">www.uksailmakers-ne.com</a>';
const embedded = '<img src="cid:dave@uk-sailmakers-ne.com"/>'

signature = `${glyph}${name}<p>${email}</p>${phone}<p>${site}</p><br/>${embedded}`;

module.exports = signature;

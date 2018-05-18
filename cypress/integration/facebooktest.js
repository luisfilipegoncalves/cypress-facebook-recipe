
describe('Download FB photos in group', function() {
  it('Visits Facebook photos', function() {

    cy.visit(Cypress.env('url'))
    
    // TODO check if user already logged in
    cy.get('input#email.inputtext').type(Cypress.env('email'))
    cy.get('input#pass.inputtext').type(Cypress.env('pass'))
    cy.contains('Iniciar Sessão').click()
	
    // get first grid photo and open it
    cy.get('.itemsPlutoniumRedesign').first().click()	 	 	
 	cy.get('#photos_snowlift > div._n9 > div > div.fbPhotoSnowliftContainer.snowliftPayloadRoot.uiContextualLayerParent > div.clearfix.fbPhotoSnowliftPopup > div.stageWrapper.lfloat._ohe > div.stage > div._2-sx > img')
	
 	// Hack to force high res image
	cy.contains('Opções').click()
	cy.contains('Opções').click()
     	 
    let images = []

	// TODO find out how many photos exist in the group 
	const numberOfPics = 10;

    for(let i=0; i<numberOfPics; ++i) {
	    cy.get('img.spotlight')
	    	.then( ($myImg) => {
	    		 const imageUrl = $myImg.attr('src');
	    		 
	    		 // TODO stop when looped to beggining
	    		 images.push(imageUrl)
	    		 
	    		 // click arrow next picture
	    		 cy.get('#photos_snowlift > div._n9 > div > div.fbPhotoSnowliftContainer.snowliftPayloadRoot.uiContextualLayerParent > div.clearfix.fbPhotoSnowliftPopup > div.stageWrapper.lfloat._ohe > a.snowliftPager.next.hilightPager').click()

	    		 // download image
	    		 cy.exec('curl -o imageSalaLilas'+i+'.png ' + '\"' + imageUrl + '\"' ).then( (res) => {
	    		 		cy.log("curl result: ", res)
	    		 })
	    	})    	
	 }
	 // Find close button and click
	 cy.get('#photos_snowlift > div._n9 > div > a').click()

	 //  Logout 
	 cy.get('#userNavigationLabel').click()
	 cy.contains('Terminar Sessão').click()
  })
})

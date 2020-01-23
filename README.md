# SshUtility
Tool for executing cache terminal commands via SSH, saving and applying traklayout patches, transferring files via SFTP to multiple environments, and has an embedded web terminal for your local instance.

Added custom TrakLayoutPatch save/load feature - This allows users to apply trak layout changes for specific component, context, chart, chart item, transform, icon definition, etc. rather than applying layout changes instance-wide.

Added Deploy Page menu button: This is now a modal pop-up with the SVN deployment form and a link to the source control settings page. Uses a REST service to obtain session token for SSO.

Added webterminal component. Enhanced installer method. 

*** Apologies - Currently designed for Northwell Health site implementation.
***             Ongoing development to make site-agnostic.

## Installation
1.) Import HieCOMMONLIBSSHToolsV1.xml COS classes into local HS environment

2.) Run methods in desired HS namespace - Modify Populate method to suit specific implementation - current code is for Northwell implementations: 
  > Do ##Class(CUSTOM.CORE.Util.SSHTool.GeneralConfig).Configure() 

3.) Add your local instance user:pass to /src/app/api/api.config.ts:
  > Class ApiConfig:
  
  > > Line: public UserPassBasic = 'Basic ' + btoa('janderson:demo');
  
  > > Replace 'janderson:demo' with your local environment 'user:password'

4.) Add your local host url:port to /src/environments.ts
  > export const environment = {
  
  > > production: false,
  
  > > apiUrl: 'http://localhost:57772'
  
  > };

5.) Build distribution
	>  ng build --prod --base-href ./
	
6.) For Trak Layout Patch Feature to work:
  > CUSTOM.CORE.Util.TrakLayout.Utility must be deployed to all environments where Trak Layout patches might be applied. This is to facilitate the loading/applying of the layout patch file.

7.) For webTerminal install: 
  > Download installer:
  > > https://intersystems-community.github.io/webterminal/#downloads   
  > Documentation:
  > > https://intersystems-community.github.io/webterminal/#docs

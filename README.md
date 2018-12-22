# SshUtility
Tool for executing cache terminal commands via SSH and transferring files via SFTP to multiple AIX servers.

*** Apologies - Currently designed for Northwell Health site implementation.
***             Ongoing development to make site-agnostic. 

## Installation
1.) Import HieCOMMONLIBSSHToolsV1.xml COS classes into local HS environment

2.) Create web application:
  > Name: /csp/rest/sshtools
  
  > Dispatch Class: CUSTOM.CORE.REST.SSHToolUtils

3.) Create local ensemble credentials: 
  > Credential: ADLogin (HS access)
  
  > Credential: SSHLogin (SSH access) 
  
  > Must be on production with same namespace as one configured for REST service web application created in step #2

4.) Run methods in desired HS namespace: 
  > Do ##Class(CUSTOM.CORE.Util.SSHTool.TargetConfig).Populate() 
  
  > Do ##Class(CUSTOM.CORE.Util.SSHTool.TargetGroupConfig).Populate()

5.) Add your local instance user:pass to /src/app/api/api.config.ts:
  > Class ApiConfig:
  
  > > Line: public UserPassBasic = 'Basic ' + btoa('janderson:demo');
  
  > > Replace 'janderson:demo' with your 'user:password'

6.) Add your local host url:port to /src/environments.ts
  > export const environment = {
  
  > > production: false,
  
  > > apiUrl: 'http://localhost:57772'
  
  > };


*** Currently writing install method to handle these steps and allow user to enter config ***

*** Currently adding custom TrakLayoutPatch save/load feature - This allows users to apply trak layout changes for specific component, context, chart, chart item, transform, icon definition, etc. rather than applying layout changes instance-wide.

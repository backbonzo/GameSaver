<!-- GETTING STARTED DEVICE -->
## Getting Started With Device

To get a local copy up and running follow these simple steps.

### Prerequisites Device

This is require to run the Device:
* Python 3.7.3
* Raspberry Pi / Python Instance
* USB Camera
* A MongoDB Connection
* Pip
<br />
Pip should be installed from Python. Otherwise choose correct way of installing depending on your OS.


### Installation Device

1. Clone the repo if already not done so.
   ```sh
   git clone https://github.com/backbonzo/SchoolProjectV2.git
   ```
2. Cd into the correct directory
   ```sh
   cd prototype/DeviceGarbageCam/
   ```
3. Install PIP packages
   ```sh
   pip install -r requirements.txt
   ```
4. Change credentials inside configCred.py
   ```python
   user= Mongo DB Username
   password= Mongo DB Password
   cl= Mongo DB Cluster
   db= Database Name
   coll= Collection Name in db
   description= A Description of the device
   latitude= Hardcoded Latitude (will change later)
   longitude= Hardcoded Longitude (will change later)
   ```
5. Run!
   ```sh
   python3 track.py
   ```
   
 ## Congrats, you're done! :sparkles:
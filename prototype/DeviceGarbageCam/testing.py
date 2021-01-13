import configCred

# Getting length of list
length = len(configCred.tempName)
i = 0
  
# Iterating using while loop
while i < length:
    print(configCred.tempName[i])
    print(configCred.description[i])
    print(configCred.latitude[i])
    print(configCred.longitude[i])
    i += 1
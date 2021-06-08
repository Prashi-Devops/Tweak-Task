## Unit Test Cases

### Test Case1: Create an User using User API
![TestCase1](./_images/Usertest1.png)
#### Expected Result: User is created Successfully

### Test Case2: Try to create a User which is alrady exists
![TestCase2](./_images/Usertest2.png)
#### Expected Result: User already Exists

### Verification of User Created in the Cognito User Pool
![TestCase3](./_images/Usertest3.png)

### Test Case3: Upload the image to s3 bucket with the user created above
![TestCase4](./_images/authtest6.png)
#### Data uploaded to s3 successfully

### Test Case4: Upload the image to s3 bucket with the invalid user
![TestCase5](./_images/authtest2.png)
#### User not Authorized to upload the object

### Verification of Upload image in s3 and extract the metadata of the image and store it in s3
![TestCase6](./_images/authtest3.png)

### Content of the file Vinu2.jpg
![TestCase7](./_images/authtest4.png)

### Content of the file Vinu2-metadata.jpg
![TestCase8](./_images/authtest5.png)

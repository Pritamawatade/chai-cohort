# They mystery behind login, signup, registration forms.



You often wonder at a time when fill all those registration forms. What does actually happens behind those submit buttons? Where your all data goes when press the submit buttons. right?

No worries in this article I am going to clear all your doubts about forms in the web page. 
Long story short form are collection input tags which takes the value from the user in different styles. why do i say in different styles. because there are multiple ways to select the values and entering the data in no matter even if the data is in same type we can construct the form such that user can select the different values in different ways.

This is an example form in HTML:

```html
 <form method="POST" action="" class="needs-validation" novalidate>
                <div class="form-floating">
                    <input type="text" class="form-control" id="fullName" name="fullName" placeholder="Full Name" required>
                    <label for="fullName"><i class="fas fa-user me-2"></i>Full Name</label>
                    <div class="invalid-feedback">Please enter your full name.</div>
                </div>

                <div class="form-floating">
                    <input type="text" class="form-control" id="username" name="username" placeholder="Username" required>
                    <label for="username"><i class="fas fa-at me-2"></i>Username</label>
                    <div class="invalid-feedback">Please choose a username.</div>
                </div>

                <div class="form-floating">
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
                    <label for="email"><i class="fas fa-envelope me-2"></i>Email address</label>
                    <div class="invalid-feedback">Please enter a valid email address.</div>
                </div>

                <div class="form-floating">
                    <input type="tel" class="form-control" id="contact" name="contact" 
                           pattern="[6-9]{1}[0-9]{9}" placeholder="Contact" required>
                    <label for="contact"><i class="fas fa-phone me-2"></i>Phone Number</label>
                    <div class="invalid-feedback">Please enter a valid Indian phone number (10 digits starting with 6-9).</div>
                </div>

                <div class="form-floating">
                    <input type="password" class="form-control" id="password" name="password" 
                           minlength="6" placeholder="Password" required>
                    <label for="password"><i class="fas fa-lock me-2"></i>Password</label>
                    <div class="invalid-feedback">Password must be at least 6 characters long.</div>
                </div>

                <div class="d-grid gap-2 mt-4">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-user-plus me-2"></i>Create Account
                    </button>
                </div>

                <p class="text-center mt-4">
                    Already have an account? 
                    <a href="login.php" class="text-decoration-none">
                        <i class="fas fa-sign-in-alt me-1"></i>Login here
                    </a>
                </p>
            </form>  
```


In the above code block you can see that this is user registration form which takes lot of input values like name, password, phone number, email, username just like this we can also take input of colors, dates, time and many more. normally we use <input /> tag for taking the input from the user. 
In the input tag there is type attribute which define the type of input we taking from the user some of the most important type are 


text

email

password

date

color

password

number

tel


                    <input type="text" class="form-control" id="fullName" name="fullName" placeholder="Full Name" required>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
                    <input type="tel" class="form-control" id="contact" name="contact" 
                    <input type="password" class="form-control" id="password" name="password" 


Most of the time we are only going to deal with this type of input values.



Now you know what are the forms and how we should we create it. 


Now comes to the point to understand what happens under the hood when you click on that submit button in every form. This is what happens. In every form there are certain validation on the input of the forms you only able to submit that form once you pass those validations. so after you click on the submit button all the values of the input tags are send to the backend to store into the database. Again to store the values of input tags and send it to backend is solely depends on the language your using. 



The following are the practical applications of forms


Signup

signin

feedback forms

registration forms

survey forms

applying for jobs

government documents

These are couple of example on the uses of the forms. 
forms are really a powerful entity in the frontend world.

Hope you like the blog if not please share the feedback on i can improve.
see you again


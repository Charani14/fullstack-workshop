public class Person {

    // 1. Private fields (Encapsulation)
    private String name;
    private int age;
    private String email;

    // 2. No-argument constructor
    public Person() {
        // default constructor
    }

    // 3. All-arguments constructor
    public Person(String name, int age, String email) {
        this.name = name;
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be between 0 and 150");
        }
        this.age = age;
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email address");
        }
        this.email = email;
    }

    // 4. Getters and Setters with validation

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be between 0 and 150");
        }
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email address");
        }
        this.email = email;
    }

    // 5. toString() method
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + ", email='" + email + "'}";
    }

    // 6. Main method to demonstrate functionality
    public static void main(String[] args) {

        // Using no-arg constructor
        Person p1 = new Person();
        p1.setName("Charani");
        p1.setAge(23);
        p1.setEmail("charani@gmail.com");

        System.out.println(p1);

        // Using all-args constructor
        Person p2 = new Person("Sudhamshu", 28, "sudhamshu@gmail.com");

        // Updating age using setter
        p2.setAge(30);

        // Print object
        System.out.println(p2);
    }
}

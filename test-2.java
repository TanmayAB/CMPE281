

public interface A1 {

}



public interface A2 {

}



public class B1 extends P implements A1 {

}



public class B2 extends P implements A1, A2 {

}



public class C1 {

    public void test( A1 a1 ) {
        // call a1 methods
    }


}



public class C2 {

    public void test( A2 a2 ) {
        // call a2 methods
    }

}



public class P {

}


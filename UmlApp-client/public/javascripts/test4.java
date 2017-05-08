
public interface Subject {
 
	public void attach(Observer obj);
	public void detach(Observer obj);
	public void notifyObservers();
}
 

public interface Observer {
 
	public abstract void update();
}
 

public class Optimist extends ConcreteObserver {
 
    public Optimist( ConcreteSubject sub )
    {
        super( sub ) ;
    }
    
	public void update() {
	    if ( subject.getState().equalsIgnoreCase("The Price of gas is at $5.00/gal")      )
        {
             observerState = "Great! It's time to go green." ;
        }
        else if ( subject.getState().equalsIgnoreCase( "The New iPad is out today" ) )
        {
            observerState = "Apple, take my money!" ;
        }
        else
        {
            observerState = ":)" ;
        }
	}
	 
}
 



public class Pessimist extends ConcreteObserver {

    public Pessimist( ConcreteSubject sub )
    {
        super( sub ) ;
    }

    public void update() {
        if ( subject.getState().equalsIgnoreCase("The Price of gas is at $5.00/gal") )
        {
            observerState = "This is the beginning of the end of the world!" ;
        }
        else if ( subject.getState().equalsIgnoreCase( "The New iPad is out today" ) )
        {
            observerState = "Not another iPad!"  ;
        }
        else
        {
            observerState = ":(" ;
        }
	}
	 
}
 

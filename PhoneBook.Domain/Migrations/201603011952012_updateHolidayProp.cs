namespace PhoneBook.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateHolidayProp : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "HolidayTimeStart", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "HolidayTimeEnd", c => c.DateTime(nullable: false));
            DropColumn("dbo.AspNetUsers", "HolidayTime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "HolidayTime", c => c.DateTime(nullable: false));
            DropColumn("dbo.AspNetUsers", "HolidayTimeEnd");
            DropColumn("dbo.AspNetUsers", "HolidayTimeStart");
        }
    }
}
